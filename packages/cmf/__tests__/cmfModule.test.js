import mergeModulesAndApp from '../src/cmfModule';

describe('cmfModule', () => {
	it('should merge modules', async () => {
		const fooModule = { id: 'foo', components: { foo: jest.fn() } };
		const barModule = { id: 'bar', components: { bar: jest.fn() } };
		const bazModule = { id: 'baz', components: { baz: jest.fn() } };
		const withModule = { id: 'with', modules: [barModule] };
		const config = await mergeModulesAndApp({
			modules: [fooModule, bazModule, withModule],
		});
		expect(config.components.foo).toBe(fooModule.components.foo);
		expect(config.components.bar).toBe(barModule.components.bar);
		expect(config.components.baz).toBe(bazModule.components.baz);
	});
	it('should throw if module has no id', async () => {
		const fooModule = { components: { foo: jest.fn() } };
		try {
			await mergeModulesAndApp({
				modules: [fooModule],
			});
			fail();
		} catch (e) {
			expect(e.message).toBe('a cmf.module must have an id');
		}
	});
});
