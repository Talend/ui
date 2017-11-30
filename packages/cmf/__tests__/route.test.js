/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import route from '../src/route';
import registry from '../src/registry';

describe('CMF route', () => {
	it('registerComponent should be an alias to component.get', () => {
		function C1() { }
		const emptyRegistry = {};
		registry.Registry._registry = emptyRegistry;
		route.registerComponent('C1', C1);
		expect(emptyRegistry['_.route.component:C1']).toBe(C1);
	});
});
