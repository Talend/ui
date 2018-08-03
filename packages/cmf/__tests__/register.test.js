import { registerInternals } from '../src/register';
import actionCreator from '../src/actionCreator';
import expression from '../src/expression';

describe('register', () => {
	it('registerInternals should add internal actionCreators & expressions to the registry', () => {
		const context = {
			registry: {},
		};
		expect(() => actionCreator.get(context, 'cmf.saga.start')).toThrow();
		expect(() => actionCreator.get(context, 'cmf.saga.stop')).toThrow();
		expect(expression.get('cmf.collections.get', context)).toBeUndefined();
		expect(expression.get('cmf.components.get', context)).toBeUndefined();
		registerInternals(context);
		expect(actionCreator.get(context, 'cmf.saga.start')).toBeDefined();
		expect(actionCreator.get(context, 'cmf.saga.stop')).toBeDefined();
		expect(expression.get('cmf.collections.get', context)).toBeDefined();
		expect(expression.get('cmf.components.get', context)).toBeDefined();
	});
});
