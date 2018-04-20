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
});
