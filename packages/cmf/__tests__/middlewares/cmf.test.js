import cmfMiddleware from '../../src/middlewares/cmf';
import { COLLECTION_ADD_OR_REPLACE } from '../../src/actions/collectionsActions';

describe('CMF middleware', () => {
	let store;
	let next;
	let middleware;
	const leftClickEvent = {
		button: 0,
	};
	const genericRouteReplaceAction = {
		cmf: {
			routerReplace(data) {
				return `/route/${data.response.id}`;
			},
		},
		response: { id: 28 },
		event: leftClickEvent,
	};
	beforeEach(() => {
		store = {
			dispatch: jest.fn(),
		};
		next = jest.fn();
		middleware = cmfMiddleware(store)(next);
	});
	it('should be a middleware', () => {
		expect(typeof cmfMiddleware).toBe('function');
		expect(typeof middleware).toBe('function');
	});
	it('should dispatch addOrReplace if collectionId', () => {
		const action = {
			cmf: {
				collectionId: 'mycollection',
			},
			response: { somedata: true },
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe(COLLECTION_ADD_OR_REPLACE);
		expect(arg.collectionId).toBe('mycollection');
		expect(arg.data).toBe(action.response);
	});
	it('should dispatch router push if cmf.routerPush is a string', () => {
		const action = {
			cmf: {
				routerPush: '/route',
			},
			response: { id: 28 },
			event: leftClickEvent,
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('push');
		expect(arg.payload.args[0]).toBe('/route');
	});
	it('should dispatch router push if cmf.routerPush is a function', () => {
		const action = {
			cmf: {
				routerPush(data) {
					return `/route/${data.response.id}`;
				},
			},
			response: { id: 28 },
			event: leftClickEvent,
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('push');
		expect(arg.payload.args[0]).toBe('/route/28');
	});
	it('should dispatch router replace if cmf.routerReplace is a string', () => {
		const action = {
			cmf: {
				routerReplace: '/route',
			},
			response: { id: 28 },
			event: leftClickEvent,
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('replace');
		expect(arg.payload.args[0]).toBe('/route');
	});
	it('should dispatch router replace if cmf.routerReplace is a function', () => {

		middleware(genericRouteReplaceAction);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('replace');
		expect(arg.payload.args[0]).toBe('/route/28');
	});

	describe('open route in new tab', () => {
		beforeEach(() => {
			global.open = jest.fn();
		});
		it('should open route in new tab when ctrl-click', () => {
			middleware({ ...genericRouteReplaceAction,
				event: {
					button: 0,
					ctrlKey: true,
				},
			});
			expect(global.open).toHaveBeenCalled();
		});

		it('should open route in new tab when middle-click (mousewheel)', () => {
			middleware({ ...genericRouteReplaceAction,
				event: {
					button: 1,
				},
			});
			expect(global.open).toHaveBeenCalled();
		});

		it('should not open route in new tab when normal click', () => {
			middleware({ ...genericRouteReplaceAction,
				event: {
					button: 0,
				},
			});
			expect(global.open).not.toHaveBeenCalled();
		});
	});
});
