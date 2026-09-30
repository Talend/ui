import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { onLocationChanged } from '@talend/connected-react-router';
import { getRouter } from './UIRouter';

const injectSpy = vi.hoisted(() => vi.fn());

vi.mock('@talend/react-cmf', async () => {
	const actual = await vi.importActual('@talend/react-cmf');
	function Inject(props) {
		injectSpy(props);
		const { component, children } = props;
		return (
			<div data-testid={`inject-${component}`}>
				{component}
				{children}
			</div>
		);
	}
	return { ...actual, default: actual.default, Inject };
});

function createHistory() {
	window.history.replaceState({}, '', '/');
	return createBrowserHistory();
}

/** minimal store: router state is driven by the test as the fork reducer would do */
function createTestStore(routes, location) {
	let state = { cmf: { settings: { routes } }, router: { location, action: 'POP' } };
	const listeners = new Set();
	const dispatched = [];
	return {
		dispatched,
		getState: () => state,
		subscribe: listener => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		dispatch: action => {
			dispatched.push(action);
			if (action.type === '@@router/LOCATION_CHANGE') {
				state = {
					...state,
					router: { location: action.payload.location, action: action.payload.action },
				};
				listeners.forEach(listener => listener());
			}
			return action;
		},
	};
}

function renderRouter({ routes, loading, children, basename, pathname = '/' }) {
	const history = createHistory();
	if (pathname !== '/') {
		history.replace(pathname);
	}
	const store = createTestStore(routes, history.location);
	const Router = getRouter(history, basename);
	const utils = render(
		<Provider store={store}>
			<Router loading={loading}>{children}</Router>
		</Provider>,
	);
	return { history, store, ...utils };
}

describe('UIRouter getRouter', () => {
	describe('render branches', () => {
		it('should render the route tree when routes have path and component', () => {
			renderRouter({ routes: { path: '/', component: 'App' } });
			expect(screen.getByTestId('inject-App')).toBeTruthy();
		});

		it('should render the loading component when routes are not loaded and loading is provided', () => {
			renderRouter({ routes: { path: '/' }, loading: 'Loader' });
			expect(screen.getByTestId('inject-Loader')).toBeTruthy();
		});

		it('should render children inside the Router when routes is empty', () => {
			renderRouter({ routes: {}, children: <span data-testid="child">child</span> });
			expect(screen.getByTestId('child')).toBeTruthy();
		});

		it('should render a loading fallback for incomplete routes without loading prop', () => {
			const { container } = renderRouter({ routes: { path: '/' } });
			expect(container.querySelector('.is-loading').textContent).toBe('loading');
		});
	});

	describe('route mapping (getRouteProps)', () => {
		const routes = {
			path: '/',
			component: 'App',
			indexRoute: { component: 'Home' },
			childRoutes: [
				{ path: 'foo', component: 'Foo' },
				{
					path: '/abs',
					component: 'Abs',
					childRoutes: [{ path: 'nested', component: 'Nested' }],
				},
				{ path: 'noComponent', childRoutes: [{ path: 'leaf', component: 'Leaf' }] },
				{ path: '*', component: 'NotFound' },
			],
		};

		it('should render index route in the parent Outlet', () => {
			renderRouter({ routes });
			expect(screen.getByTestId('inject-App')).toBeTruthy();
			expect(screen.getByTestId('inject-Home')).toBeTruthy();
		});

		it('should render a relative child route', () => {
			renderRouter({ routes, pathname: '/foo' });
			expect(screen.getByTestId('inject-Foo')).toBeTruthy();
			expect(screen.queryByTestId('inject-Home')).toBeNull();
		});

		it('should render an absolute child route path', () => {
			renderRouter({ routes, pathname: '/abs' });
			expect(screen.getByTestId('inject-Abs')).toBeTruthy();
		});

		it('should render nested child of an absolute path parent', () => {
			renderRouter({ routes, pathname: '/abs/nested' });
			expect(screen.getByTestId('inject-Abs')).toBeTruthy();
			expect(screen.getByTestId('inject-Nested')).toBeTruthy();
		});

		it('should render children of a route without component through a bare Outlet', () => {
			renderRouter({ routes, pathname: '/noComponent/leaf' });
			expect(screen.getByTestId('inject-Leaf')).toBeTruthy();
		});

		it('should render the catch all route', () => {
			renderRouter({ routes, pathname: '/does/not/exist' });
			expect(screen.getByTestId('inject-NotFound')).toBeTruthy();
		});

		it('should forward extra route props (not path/childRoutes/indexRoute) to Inject', () => {
			injectSpy.mockClear();
			renderRouter({ routes: { path: '/', component: 'App', foo: 'bar', childRoutes: [] } });
			const props = injectSpy.mock.calls[0][0];
			expect(props).toMatchObject({ component: 'App', foo: 'bar' });
			expect(props).not.toHaveProperty('childRoutes');
			expect(props).not.toHaveProperty('indexRoute');
		});
	});

	describe('history <-> redux sync', () => {
		it('should dispatch LOCATION_CHANGE when history changes', () => {
			const { history, store } = renderRouter({ routes: { path: '/', component: 'App' } });
			act(() => history.push('/foo?a=1'));
			const change = store.dispatched.find(a => a.type === '@@router/LOCATION_CHANGE');
			expect(change.payload).toMatchObject({
				action: 'PUSH',
				location: { pathname: '/foo', search: '?a=1' },
				isFirstRendering: false,
			});
			expect(change).toEqual(onLocationChanged(change.payload.location, 'PUSH', false));
		});

		it('should stop listening on unmount', () => {
			const { history, store, unmount } = renderRouter({
				routes: { path: '/', component: 'App' },
			});
			unmount();
			const before = store.dispatched.length;
			history.push('/foo');
			expect(store.dispatched).toHaveLength(before);
		});
	});

	it('should have a display name for devtools', () => {
		const Router = getRouter(createHistory());
		expect(Router.displayName).toContain('CMFReactRouterIntegration');
	});
});
