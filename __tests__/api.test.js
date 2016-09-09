import api from '../src/api';

describe('CMF api', () => {
	it('provide action, route access', () => {
		expect(typeof api.action).toBe('object');
	});
});
