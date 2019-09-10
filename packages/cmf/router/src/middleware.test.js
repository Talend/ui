import cmfMiddleware from './middleware';

describe('CMF middleware', () => {
	let store;
	let next;
	let middleware;
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
	it('should dispatch router push if cmf.routerPush is a string', () => {
		const action = {
			cmf: {
				routerPush: '/route',
			},
			response: { id: 28 },
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
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('replace');
		expect(arg.payload.args[0]).toBe('/route');
	});
	it('should dispatch router replace if cmf.routerReplace is a function', () => {
		const action = {
			cmf: {
				routerReplace(data) {
					return `/route/${data.response.id}`;
				},
			},
			response: { id: 28 },
		};
		middleware(action);
		expect(store.dispatch).toHaveBeenCalled();
		const arg = store.dispatch.mock.calls[0][0];
		expect(arg.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(arg.payload.method).toBe('replace');
		expect(arg.payload.args[0]).toBe('/route/28');
	});
});
