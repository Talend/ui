import api from '../src/api';

describe('CMF api', () => {
	it('provide action, route access', () => {
		expect(typeof api.action).toBe('object');
		expect(api.action).toBeDefined();
		expect(api.actions).toBeDefined();
		expect(api.actionCreator).toBeDefined();
		expect(api.component).toBeDefined();
		expect(api.expression).toBeDefined();
		expect(api.route).toBeDefined();
		expect(api.registry).toBeDefined();
		expect(api.registerInternals).toBeDefined();
		expect(api.sagas).toBeDefined();
		expect(api.saga).toBeDefined();
	});
	it('registerInternals should add internal actionCreators & expressions to the registry', () => {
		const context = {
			registry: {},
		};
		expect(() => api.actionCreator.get(context, 'cmf.saga.start')).toThrow();
		expect(() => api.actionCreator.get(context, 'cmf.saga.stop')).toThrow();
		expect(api.expression.get('cmf.collections.get', context)).toBeUndefined();
		expect(api.expression.get('cmf.components.get', context)).toBeUndefined();
		api.registerInternals(context);
		expect(api.actionCreator.get(context, 'cmf.saga.start')).toBeDefined();
		expect(api.actionCreator.get(context, 'cmf.saga.stop')).toBeDefined();
		expect(api.expression.get('cmf.collections.get', context)).toBeDefined();
		expect(api.expression.get('cmf.components.get', context)).toBeDefined();
	});
});
