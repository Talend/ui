import getErrorMiddleware, {
	URL_REQUIRED_MESSAGE,
} from '../../src/middlewares/error';
import {
	HTTP_METHODS,
} from '../../src/middlewares/http/constants';

describe('CMF error middleware getErrorMiddleware', () => {
	it('should return a middleware using slug', () => {
		const middlewareFactory = getErrorMiddleware('/api/errors');
		expect(typeof middlewareFactory).toBe('function');
		const store = {
			dispatch: jest.fn(),
			state: {},
		};
		const next = (action) => {
			if (action.type === 'THROW') {
				throw new Error('message');
			}
			return {
				action,
				called: true,
			};
		};
		const action = { type: 'THROW' };
		const middleware = middlewareFactory(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		expect(newState.action.type).toBe(HTTP_METHODS.POST);
		expect(newState.action.body.reduxState).toBe(store.state);
		expect(newState.action.body.action.type).toBe('THROW');
		expect(newState.action.body.userAgent).toMatch(navigator.userAgent);
		expect(newState.action.body.error.message).toBe('message');
	});
	it('should throw exception without slug', () => {
		expect(getErrorMiddleware).toThrow(URL_REQUIRED_MESSAGE);
	});
});
