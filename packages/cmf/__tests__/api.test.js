import api from '../src/api';

describe('CMF api', () => {
	it('provide action, route access', () => {
		expect(typeof api.action).toBe('object');
		expect(api.action).toBeDefined();
		expect(api.actions).toBeDefined();
		expect(api.actionCreator).toBeDefined();
		expect(api.component).toBeDefined();
		expect(api.console).toBeDefined();
		expect(api.expression).toBeDefined();
		expect(api.route).toBeDefined();
		expect(api.registry).toBeDefined();
		expect(api.registerInternals).toBeDefined();
		expect(api.sagas).toBeDefined();
		expect(api.saga).toBeDefined();
	});
	it('registerInternals should add internal actionCreators to the registry', () => {
		const context = {
			registry: {},
		};
		expect(() => api.actionCreator.get(context, 'cmf.saga.start')).toThrow();
		expect(() => api.actionCreator.get(context, 'cmf.saga.stop')).toThrow();
		api.registerInternals(context);
		expect(api.actionCreator.get(context, 'cmf.saga.start')).toBeDefined();
		expect(api.actionCreator.get(context, 'cmf.saga.stop')).toBeDefined();
	});
});
