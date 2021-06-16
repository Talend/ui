import cmfMiddleware from '../../src/middlewares/cmf';
import onError from '../../src/onError';
import CONSTANT from '../../src/constant';

jest.mock('../../src/onError', () => ({
	addAction: jest.fn(),
}));

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
		expect(arg.type).toBe(CONSTANT.COLLECTION_ADD_OR_REPLACE);
		expect(arg.collectionId).toBe('mycollection');
		expect(arg.data).toBe(action.response);
	});
});
