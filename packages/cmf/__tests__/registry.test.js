/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import registry from '../src/registry';

describe('CMF registry', () => {
	it('Registry should get a singleton', () => {
		const r1 = registry.Registry.getRegistry();
		const r2 = registry.Registry.getRegistry();
		const r3 = registry.getRegistry();
		expect(r1).toBe(r2);
		expect(r1).toBe(r3);
		expect(r1).toBe(registry.Registry._registry);
		expect(typeof r1).toBe('object');
	});
	it('addToRegistry should add item', () => {
		registry.addToRegistry('key', 'value');
		registry.addToRegistry('okey', { foo: 'bar' });
		expect(registry.Registry.getRegistry().key).toBe('value');
		expect(registry.Registry.getRegistry().okey.foo).toBe('bar');
	});
	it('getFromRegistry should return the item', () => {
		registry.addToRegistry('key', 'value');
		const value = registry.getFromRegistry('key');
		expect(value).toBe('value');
	});
});
