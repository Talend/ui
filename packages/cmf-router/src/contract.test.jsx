/**
 * Contract test of the whole cmf-router integration, on a real cmf store, real
 * saga middleware, real browser history (jsdom) and real react-router.
 * It must stay green and UNCHANGED across react-router upgrades: it pins
 * what applications rely on (actions, state.router shape, saga triggers,
 * rendered routes, document title).
 */
import { act, render, screen } from '@testing-library/react';
import { push, replace } from '@talend/connected-react-router';
import { take, put } from 'redux-saga/effects';

const SETTINGS_OK = 'REACT_CMF.REQUEST_SETTINGS_OK';

function App({ children }) {
	return (
		<div data-testid="app">
			app
			{children}
		</div>
	);
}
function Home() {
	return <div data-testid="home">home</div>;
}
function Foo() {
	return <div data-testid="foo">foo</div>;
}
function Bar({ children }) {
	return (
		<div data-testid="bar">
			bar
			{children}
		</div>
	);
}
function Baz() {
	return <div data-testid="baz">baz</div>;
}

const routes = {
	path: '/',
	component: 'App',
	documentTitle: 'Root title',
	indexRoute: { component: 'Home' },
	childRoutes: [
		{ path: 'foo', component: 'Foo', documentTitle: 'Foo title' },
		{
			path: 'bar',
			component: 'Bar',
			documentTitle: 'Bar title',
			childRoutes: [{ path: 'baz', component: 'Baz', documentTitle: 'Baz title' }],
		},
	],
};

// cmf store notifies its subscribers on requestAnimationFrame (batchedSubscribe),
// so React only sees a navigation after a frame.
async function nav(fn) {
	await act(async () => {
		fn();
		await new Promise(resolve => setTimeout(resolve, 40));
	});
}

async function setup({
	routerConfig: { initialUrl = '/', ...routerConfig } = {},
	routes: settingsRoutes = routes,
} = {}) {
	// cmf store keeps a module level middlewares array: isolate every bootstrap
	vi.resetModules();
	const cmf = (await import('@talend/react-cmf')).default;
	const getModule = (await import('./index')).default;
	window.history.replaceState({}, '', initialUrl);
	document.title = '';
	const reg = cmf.registry.getRegistry();
	reg._registry = {};
	reg._isLocked = false;

	const router = getModule(routerConfig);
	const actions = [];
	const config = await cmf.bootstrap({
		render: false,
		components: { App, Home, Foo, Bar, Baz },
		RootComponent: router.RootComponent,
		modules: [
			router.cmfModule,
			{
				id: 'action-recorder',
				middlewares: [
					() => next => action => {
						actions.push(action);
						return next(action);
					},
				],
			},
		],
	});
	config.saga.run();
	config.store.dispatch({ type: SETTINGS_OK, settings: { routes: settingsRoutes } });
	const utils = render(
		<config.App store={config.store} registry={cmf.registry.getRegistry()}>
			<router.RootComponent />
		</config.App>,
	);
	return {
		...utils,
		cmf,
		store: config.store,
		history: router.history,
		actions,
		locationChanges: () => actions.filter(a => a.type === '@@router/LOCATION_CHANGE'),
	};
}

describe('cmf-router contract', () => {
	beforeEach(() => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('initial render', () => {
		it('should render the index route and sync the location in the store', async () => {
			const { store } = await setup();
			expect(screen.getByTestId('app')).toBeTruthy();
			expect(screen.getByTestId('home')).toBeTruthy();
			expect(store.getState().router.location.pathname).toBe('/');
			expect(store.getState().router.action).toBe('POP');
		});

		it('should render the route matching the initial url', async () => {
			await setup({ routerConfig: { initialUrl: '/bar/baz' } });
			expect(screen.getByTestId('bar')).toBeTruthy();
			expect(screen.getByTestId('baz')).toBeTruthy();
			expect(screen.queryByTestId('home')).toBeNull();
		});

		it('should display a loading placeholder until settings routes are loaded', async () => {
			const { container } = await setup({ routes: {} });
			// no routes => the router renders its (empty) children inside <Router/>
			expect(container.querySelector('[data-testid="app"]')).toBeNull();
		});
	});

	describe('navigation entry points', () => {
		it('history.push should render the route and update state.router', async () => {
			const { store, history } = await setup();
			await nav(() => history.push('/foo'));
			expect(screen.getByTestId('foo')).toBeTruthy();
			expect(screen.queryByTestId('home')).toBeNull();
			expect(store.getState().router.location.pathname).toBe('/foo');
			expect(store.getState().router.action).toBe('PUSH');
		});

		it('history.replace should render the route with REPLACE action', async () => {
			const { store, history } = await setup();
			await nav(() => history.replace('/foo'));
			expect(screen.getByTestId('foo')).toBeTruthy();
			expect(store.getState().router.action).toBe('REPLACE');
		});

		it('fork push() action should navigate', async () => {
			const { store } = await setup();
			await nav(() => {
				store.dispatch(push('/foo'));
			});
			expect(screen.getByTestId('foo')).toBeTruthy();
			expect(store.getState().router.location.pathname).toBe('/foo');
			expect(store.getState().router.action).toBe('PUSH');
		});

		it('fork replace() action should navigate', async () => {
			const { store } = await setup();
			await nav(() => {
				store.dispatch(replace('/foo'));
			});
			expect(store.getState().router.action).toBe('REPLACE');
			expect(screen.getByTestId('foo')).toBeTruthy();
		});

		it('cmf.routerPush action should navigate', async () => {
			const { store } = await setup();
			await nav(() => {
				store.dispatch({ type: 'ANY', cmf: { routerPush: '/foo' } });
			});
			expect(screen.getByTestId('foo')).toBeTruthy();
			expect(store.getState().router.action).toBe('PUSH');
		});

		it('cmf.routerReplace action should navigate', async () => {
			const { store } = await setup();
			await nav(() => {
				store.dispatch({ type: 'ANY', cmf: { routerReplace: '/foo' } });
			});
			expect(screen.getByTestId('foo')).toBeTruthy();
			expect(store.getState().router.action).toBe('REPLACE');
		});

		it('history.back should go back and dispatch POP', async () => {
			const { store, history } = await setup();
			await nav(() => history.push('/foo'));
			expect(screen.getByTestId('foo')).toBeTruthy();
			await act(async () => {
				history.back();
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			expect(screen.getByTestId('home')).toBeTruthy();
			expect(store.getState().router.location.pathname).toBe('/');
			expect(store.getState().router.action).toBe('POP');
		});

		it('should render nested routes', async () => {
			const { history } = await setup();
			await nav(() => history.push('/bar/baz'));
			expect(screen.getByTestId('bar')).toBeTruthy();
			expect(screen.getByTestId('baz')).toBeTruthy();
		});
	});

	describe('@@router/LOCATION_CHANGE', () => {
		it('should be dispatched once per navigation with location and action', async () => {
			const { history, locationChanges } = await setup();
			const before = locationChanges().length;
			await nav(() => history.push('/foo'));
			await nav(() => history.push('/bar'));
			const added = locationChanges().slice(before);
			expect(added).toHaveLength(2);
			expect(added[0].payload).toMatchObject({
				action: 'PUSH',
				location: { pathname: '/foo' },
				isFirstRendering: false,
			});
			expect(added[1].payload.location.pathname).toBe('/bar');
		});

		it('should include the search and hash in the store location', async () => {
			const { store, history } = await setup();
			await nav(() => history.push('/foo?a=1#top'));
			expect(store.getState().router.location).toMatchObject({
				pathname: '/foo',
				search: '?a=1',
				hash: '#top',
			});
		});
	});

	describe('basename', () => {
		it('should prefix navigations done through every entry point', async () => {
			const { store, history } = await setup({
				routerConfig: { basename: '/app', initialUrl: '/app/' },
			});
			await nav(() => history.push('/foo'));
			expect(window.location.pathname).toBe('/app/foo');
			await nav(() => {
				store.dispatch({ type: 'ANY', cmf: { routerPush: '/bar' } });
			});
			expect(window.location.pathname).toBe('/app/bar');
			expect(screen.getByTestId('bar')).toBeTruthy();
		});
	});

	describe('sagaRouter', () => {
		function createSagas() {
			const started = [];
			const cancelled = [];
			return {
				started,
				cancelled,
				sagaRouterConfig: {
					'/foo': function* fooSaga(params, isExact) {
						started.push({ route: '/foo', params, isExact });
						try {
							yield take('NEVER');
						} finally {
							cancelled.push('/foo');
						}
					},
					'/bar/:id': function* barSaga(params) {
						started.push({ route: '/bar/:id', params });
						try {
							yield take('NEVER');
						} finally {
							cancelled.push('/bar/:id');
						}
					},
				},
			};
		}

		it('should start a saga when navigating to its route and cancel it on leave', async () => {
			const { sagaRouterConfig, started, cancelled } = createSagas();
			const { history } = await setup({ routerConfig: { sagaRouterConfig } });
			expect(started).toHaveLength(0);
			await nav(() => history.push('/foo'));
			expect(started).toEqual([{ route: '/foo', params: {}, isExact: true }]);
			await nav(() => history.push('/'));
			expect(cancelled).toEqual(['/foo']);
		});

		it('should start the saga matching the initial location', async () => {
			const { sagaRouterConfig, started } = createSagas();
			await setup({ routerConfig: { sagaRouterConfig, initialUrl: '/foo' } });
			expect(started).toHaveLength(1);
			expect(started[0].route).toBe('/foo');
		});

		it('should restart a saga only when params change', async () => {
			const { sagaRouterConfig, started, cancelled } = createSagas();
			const { history } = await setup({ routerConfig: { sagaRouterConfig } });
			await nav(() => history.push('/bar/1'));
			expect(started.map(s => s.params)).toEqual([{ id: '1' }]);
			// same params, other search => no restart
			await nav(() => history.push('/bar/1?x=1'));
			expect(started).toHaveLength(1);
			await nav(() => history.push('/bar/2'));
			expect(cancelled).toEqual(['/bar/:id']);
			expect(started.map(s => s.params)).toEqual([{ id: '1' }, { id: '2' }]);
		});

		it('should evaluate routes on every LOCATION_CHANGE only', async () => {
			const seen = [];
			const sagaRouterConfig = {
				'/foo': function* fooSaga() {
					seen.push('start');
					yield take('NEVER');
				},
			};
			const { store, history } = await setup({ routerConfig: { sagaRouterConfig } });
			store.dispatch({ type: 'UNRELATED' });
			expect(seen).toHaveLength(0);
			await nav(() => history.push('/foo'));
			expect(seen).toEqual(['start']);
		});

		it('should let a route saga redirect using routerReplace', async () => {
			const sagaRouterConfig = {
				'/foo': function* redirect() {
					yield put({ type: 'REDIRECT', cmf: { routerReplace: '/bar' } });
				},
			};
			const { store, history } = await setup({ routerConfig: { sagaRouterConfig } });
			await nav(() => history.push('/foo'));
			expect(store.getState().router.location.pathname).toBe('/bar');
			expect(screen.getByTestId('bar')).toBeTruthy();
		});

		it('should only start the router saga after startOnAction', async () => {
			const { sagaRouterConfig, started } = createSagas();
			const { store, history } = await setup({
				routerConfig: { sagaRouterConfig, startOnAction: 'START_ROUTER' },
			});
			await nav(() => history.push('/foo'));
			expect(started).toHaveLength(0);
			await nav(() => {
				store.dispatch({ type: 'START_ROUTER' });
			});
			expect(started.map(s => s.route)).toEqual(['/foo']);
		});
	});

	describe('documentTitle', () => {
		it('should set the root documentTitle once settings are loaded', async () => {
			await setup();
			expect(document.title).toBe('Root title');
		});

		// KNOWN BUG pinned before the router upgrade: the saga reads `payload.pathname`
		// but @@router/LOCATION_CHANGE carries `payload.location.pathname`,
		// so the title never follows navigation. Update this test when fixed.
		it('does NOT follow navigation (known bug)', async () => {
			const { history } = await setup();
			await nav(() => history.push('/foo'));
			expect(document.title).toBe('Root title');
		});
	});

	describe('state.router selectors', () => {
		// KNOWN BUG pinned before the router upgrade: selectors read `state.routing`
		// (react-router-redux) but the reducer is mounted on `state.router`.
		it('cmf.router.matchPath expression throws on a real store (known bug)', async () => {
			const { store, history, cmf } = await setup();
			await nav(() => history.push('/foo'));
			const expr = cmf.expression.get('cmf.router.matchPath');
			expect(() => expr({ context: { store } }, { path: '/foo' })).toThrow(
				/locationBeforeTransitions/,
			);
		});
	});
});
