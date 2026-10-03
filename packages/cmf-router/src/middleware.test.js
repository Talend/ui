import cmfMiddleware from './middleware';

describe('CMF middleware', () => {
	let store;
	let next;
	let middleware;
	beforeEach(() => {
		store = {
			dispatch: vi.fn(),
		};
		next = vi.fn();
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

describe('CMF middleware passthrough and priority', () => {
	let store;
	let next;
	let middleware;
	beforeEach(() => {
		store = { dispatch: vi.fn() };
		next = vi.fn(action => action);
		middleware = cmfMiddleware(store)(next);
	});

	it('should pass an action without cmf key to next untouched', () => {
		const action = { type: 'FOO' };
		expect(middleware(action)).toBe(action);
		expect(next).toHaveBeenCalledWith(action);
		expect(store.dispatch).not.toHaveBeenCalled();
	});

	it('should pass an action with a cmf key but no router key to next', () => {
		const action = { type: 'FOO', cmf: { other: true } };
		middleware(action);
		expect(store.dispatch).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledWith(action);
	});

	it('should still forward the original action to next after a redirect', () => {
		const action = { type: 'FOO', cmf: { routerPush: '/foo' } };
		middleware(action);
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch.mock.calls[0][0]).toMatchObject({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: { method: 'push', args: ['/foo'] },
		});
		expect(next).toHaveBeenCalledWith(action);
	});

	it('should give priority to routerPush when routerPush and routerReplace are set', () => {
		middleware({ type: 'FOO', cmf: { routerPush: '/a', routerReplace: '/b' } });
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch.mock.calls[0][0].payload).toMatchObject({
			method: 'push',
			args: ['/a'],
		});
	});

	it('should compute the route from the action when routerReplace is a function', () => {
		const action = { type: 'FOO', id: 7, cmf: { routerReplace: a => `/item/${a.id}` } };
		middleware(action);
		expect(store.dispatch.mock.calls[0][0].payload).toMatchObject({
			method: 'replace',
			args: ['/item/7'],
		});
	});
});
