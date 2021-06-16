/* eslint no-underscore-dangle: ["error", {"allow": ["_registry", "_isLocked"] }] */
import registry from '../src/registry';

// FIXME: those are not unit test since registry is shared between tests
describe('CMF registry', () => {
	it('Registry should get a singleton', () => {
		// given
		const r1 = registry.Registry.getRegistry();
		const r2 = registry.Registry.getRegistry();
		const r3 = registry.getRegistry();

		// then
		expect(r1).toBe(r2);
		expect(r1).toBe(r3);
		expect(r1).toBe(registry.Registry._registry);
		expect(typeof r1).toBe('object');
	});

	it('addToRegistry should add item', () => {
		// given
		registry.addToRegistry('key', 'value');
		registry.addToRegistry('okey', { foo: 'bar' });

		// then
		expect(registry.Registry.getRegistry().key).toBe('value');
		expect(registry.Registry.getRegistry().okey.foo).toBe('bar');
	});

	it('addToRegistry should throw if value is undefined', () => {
		function addUndefined() {
			registry.addToRegistry('undefined', undefined);
		}
		expect(addUndefined).toThrow(
			`CMF: you can't register undefined in 'undefined'.
			You may have an import error in your configuration`,
		);
	});

	it('getFromRegistry should return the item', () => {
		// given
		registry.addToRegistry('anItem', 'value');

		// when
		const value = registry.getFromRegistry('anItem');

		// then
		expect(value).toBe('value');
	});

	it('addToRegistry should warn that a registered item is overridden', () => {
		// given
		console.warn = jest.fn();
		registry.addToRegistry('jso', 'value');

		expect(console.warn).not.toBeCalled();

		// when
		registry.addToRegistry('jso', 'otherValue');

		// then
		expect(console.warn).not.toBeCalledWith(
			"CMF: The 'key' object is registered, overriding and existing 'key' object. " +
				'Please check your CMF configuration, you might not want that.',
		);
	});

	it('addToRegistry should throw error when registry is locked', () => {
		// given
		registry.lock();

		// when / then
		expect(() => registry.addToRegistry('locked', 'value')).toThrow(
			"CMF: The registry is locked, you cannot therefore add 'locked' in it. " +
				'Please check your CMF configuration, it should not move after the initial configuration before bootstrap.',
		);
	});

	it('should test the registerMany function', () => {
		const register = jest.fn();
		const registerMany = registry.getRegisterMany(register);

		const context = { registry: {} };
		const itemsToRegister = [{ item1: 'test' }, { item2: 'test' }];

		registerMany(itemsToRegister, context);
		expect(register).toHaveBeenCalledTimes(2);
	});
});
