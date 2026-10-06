import React from 'react';
import configureStore from 'redux-mock-store';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ActionCreators, instrument } from 'redux-devtools';
import { act, render } from '@testing-library/react';
import { UNSAFE_createMemoryHistory, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import createConnectedRouter from '../src/ConnectedRouter';
import { onLocationChanged, LOCATION_CHANGE } from '../src/actions';
import plainStructure from '../src/structure/plain';
import immutableStructure from '../src/structure/immutable';
import seamlessImmutableStructure from '../src/structure/seamless-immutable';
import { connectRouter, ConnectedRouter, routerMiddleware } from '../src';

const mount = ui => render(ui);

/**
 * react-router memory history has no `entries` and, unlike history v5, replaces the
 * location state with the second argument of push/replace: restore both for the tests.
 */
const createMemoryHistory = () => {
	const history = UNSAFE_createMemoryHistory({ v5Compat: true });
	history.entries = [history.location];
	const { push, replace } = history;
	const withState = (to, state) => [
		to,
		state === undefined && typeof to === 'object' ? to.state : state,
	];
	history.push = (to, state) => {
		push(...withState(to, state));
		history.entries.push(history.location);
	};
	history.replace = (to, state) => {
		replace(...withState(to, state));
		history.entries[history.entries.length - 1] = history.location;
	};
	// react-router history keeps a single listener, history v5 supported several
	const listeners = new Set();
	history.listen(update => Array.from(listeners).forEach(fn => fn(update)));
	history.listen = fn => {
		listeners.add(fn);
		return () => listeners.delete(fn);
	};
	return history;
};

vi.mock('../src/actions', async importOriginal => {
	const actions = await importOriginal();
	return { ...actions, onLocationChanged: vi.fn(actions.onLocationChanged) };
});

describe('ConnectedRouter', () => {
	let props;
	let store;
	let history;
	let onLocationChangedSpy;

	beforeEach(() => {
		// `onLocationChanged` is mocked (see vi.mock above) to spy on calls made by `createConnectedRouter`
		onLocationChangedSpy = onLocationChanged;
		onLocationChangedSpy.mockClear();

		// Reset history
		history = createMemoryHistory();

		// Mock props
		props = {
			action: 'POP',
			location: {
				pathname: '/path/to/somewhere',
			},
			history,
		};

		// Mock store
		const mockStore = configureStore();
		store = mockStore({
			router: {
				action: 'POP',
				location: props.history.location,
			},
		});
	});

	describe('with plain structure', () => {
		let ConnectedRouter;

		beforeEach(() => {
			ConnectedRouter = createConnectedRouter(plainStructure);
		});

		it('calls `props.onLocationChanged()` when location changes.', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');
			history.push('/new-location-2');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(3);
		});

		it('unlistens the history object when unmounted.', () => {
			const wrapper = mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			props.history.push('/new-location');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);

			wrapper.unmount();

			history.push('/new-location-after-unmounted');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);
		});

		it('supports custom context', () => {
			const context = React.createContext(null);
			mount(
				<Provider store={store} context={context}>
					<ConnectedRouter {...props} context={context}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');
			history.push('/new-location-2');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(3);
		});

		it('supports location state and key', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);
			props.history.push({ pathname: '/new-location' }, { foo: 'bar' });

			expect(onLocationChangedSpy.mock.calls[1][0].state).toEqual({ foo: 'bar' });
		});

		it('updates history when store location state changes', () => {
			store = createStore(
				combineReducers({
					router: connectRouter(props.history),
				}),
				compose(applyMiddleware(routerMiddleware(props.history))),
			);

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			// Need to add PUSH action to history because initial POP action prevents history updates
			props.history.push({ pathname: '/' });

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'bar' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(3);

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'baz' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(4);
		});

		it('does not update history when store location state is unchanged', () => {
			store = createStore(
				combineReducers({
					router: connectRouter(props.history),
				}),
				compose(applyMiddleware(routerMiddleware(props.history))),
			);

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			// Need to add PUSH action to history because initial POP action prevents history updates
			props.history.push({ pathname: '/' });

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'bar' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(3);

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'bar' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(3);
		});

		it('supports custom location state compare function', () => {
			store = createStore(
				combineReducers({
					router: connectRouter(props.history),
				}),
				compose(applyMiddleware(routerMiddleware(props.history))),
			);

			mount(
				<Provider store={store}>
					<ConnectedRouter
						stateCompareFunction={(storeState, historyState) => {
							// If the store and history states are not undefined,
							// prevent history from updating when 'baz' is added to the store after 'bar'
							if (storeState !== undefined && historyState !== undefined) {
								if (storeState.foo === 'baz' && historyState.foo === 'bar') {
									return true;
								}
							}

							// Otherwise return a normal object comparison result
							return JSON.stringify(storeState) === JSON.stringify(historyState);
						}}
						{...props}
					>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			// Need to add PUSH action to history because initial POP action prevents history updates
			props.history.push({ pathname: '/' });

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'bar' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(3);

			store.dispatch({
				type: LOCATION_CHANGE,
				payload: {
					location: {
						pathname: '/',
						search: '',
						hash: '',
						state: { foo: 'baz' },
					},
					action: 'PUSH',
				},
			});

			expect(props.history.entries).toHaveLength(3);
		});

		it('only renders one time when mounted', () => {
			let renderCount = 0;

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			expect(renderCount).toBe(1);
		});

		it('does not render again when non-related action is fired', () => {
			// Initialize the render counter variable
			let renderCount = 0;

			// Create redux store with router state
			store = createStore(
				combineReducers({
					incrementReducer: (state = 0, action = {}) => {
						if (action.type === 'testAction') return ++state;

						return state;
					},
					router: connectRouter(history),
				}),
				compose(applyMiddleware(routerMiddleware(history))),
			);

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			store.dispatch({ type: 'testAction' });
			act(() => history.push('/new-location'));
			expect(renderCount).toBe(2);
		});

		it('does not call `props.onLocationChanged()` on intial location when `noInitialPop` prop is passed ', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props} noInitialPop>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(0);
		});
	});

	describe('with immutable structure', () => {
		let ConnectedRouter;

		beforeEach(() => {
			ConnectedRouter = createConnectedRouter(immutableStructure);
		});

		it('calls `props.onLocationChanged()` when location changes.', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');
			history.push('/new-location-2');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(3);
		});

		it('unlistens the history object when unmounted.', () => {
			const wrapper = mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);

			wrapper.unmount();

			history.push('/new-location-after-unmounted');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);
		});

		it('supports custom context', () => {
			const context = React.createContext(null);
			mount(
				<Provider store={store} context={context}>
					<ConnectedRouter {...props} context={context}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');
			history.push('/new-location-2');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(3);
		});

		it('only renders one time when mounted', () => {
			let renderCount = 0;

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			expect(renderCount).toBe(1);
		});

		it('does not render again when non-related action is fired', () => {
			// Initialize the render counter variable
			let renderCount = 0;

			// Create redux store with router state
			store = createStore(
				combineReducers({
					incrementReducer: (state = 0, action = {}) => {
						if (action.type === 'testAction') return ++state;

						return state;
					},
					router: connectRouter(history),
				}),
				compose(applyMiddleware(routerMiddleware(history))),
			);

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			store.dispatch({ type: 'testAction' });
			act(() => history.push('/new-location'));
			expect(renderCount).toBe(2);
		});
	});

	describe('with seamless immutable structure', () => {
		let ConnectedRouter;

		beforeEach(() => {
			ConnectedRouter = createConnectedRouter(seamlessImmutableStructure);
		});

		it('calls `props.onLocationChanged()` when location changes.', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');
			history.push('/new-location-2');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(3);
		});

		it('unlistens the history object when unmounted.', () => {
			const wrapper = mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Home</div>
					</ConnectedRouter>
				</Provider>,
			);

			expect(onLocationChangedSpy.mock.calls).toHaveLength(1);

			history.push('/new-location');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);

			wrapper.unmount();

			history.push('/new-location-after-unmounted');

			expect(onLocationChangedSpy.mock.calls).toHaveLength(2);
		});

		it('only renders one time when mounted', () => {
			let renderCount = 0;

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			expect(renderCount).toBe(1);
		});

		it('does not render again when non-related action is fired', () => {
			// Initialize the render counter variable
			let renderCount = 0;

			// Create redux store with router state
			store = createStore(
				combineReducers({
					incrementReducer: (state = 0, action = {}) => {
						if (action.type === 'testAction') return ++state;

						return state;
					},
					router: connectRouter(history),
				}),
				compose(applyMiddleware(routerMiddleware(history))),
			);

			const RenderCounter = () => {
				// subscribe to the location like a Route does
				useLocation();
				renderCount++;
				return null;
			};

			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<RenderCounter />
					</ConnectedRouter>
				</Provider>,
			);

			store.dispatch({ type: 'testAction' });
			act(() => history.push('/new-location'));
			expect(renderCount).toBe(2);
		});
	});

	describe('Redux DevTools', () => {
		let devToolsStore;

		beforeEach(() => {
			// Set initial URL before syncing
			history.push('/foo');

			// Create redux store with router state
			store = createStore(
				combineReducers({ test: (state = 'test') => state, router: connectRouter(history) }),
				instrument(),
			);
			devToolsStore = store.liftedStore;
		});

		it('resets to the initial url', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Test</div>
					</ConnectedRouter>
				</Provider>,
			);

			let currentPath;
			const historyUnsubscribe = history.listen(({ location }) => {
				currentPath = location.pathname;
			});

			history.push('/bar');
			devToolsStore.dispatch(ActionCreators.reset());

			expect(currentPath).toEqual('/foo');

			historyUnsubscribe();
		});

		it('handles toggle after history change', () => {
			mount(
				<Provider store={store}>
					<ConnectedRouter {...props}>
						<div>Test</div>
					</ConnectedRouter>
				</Provider>,
			);

			let currentPath;
			const historyUnsubscribe = history.listen(({ location }) => {
				currentPath = location.pathname;
			});

			history.push('/foo2'); // DevTools action #1
			history.push('/foo3'); // DevTools action #2

			// When we toggle an action, the devtools will revert the action
			// and we therefore expect the history to update to the previous path
			devToolsStore.dispatch(ActionCreators.toggleAction(3));
			expect(currentPath).toEqual('/foo2');

			historyUnsubscribe();
		});
	});
});
