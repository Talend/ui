import mergeModulesAndApp from '../src/cmfModule';

describe('cmfModule', () => {
	it('should merge modules', async () => {
		const fooModule = { id: 'foo', components: { foo: vi.fn() } };
		const barModule = { id: 'bar', components: { bar: vi.fn() } };
		const bazModule = { id: 'baz', components: { baz: vi.fn() } };
		const withModule = { id: 'with', modules: [barModule] };
		const config = await mergeModulesAndApp({
			modules: [fooModule, bazModule, withModule],
		});
		expect(config.components.foo).toBe(fooModule.components.foo);
		expect(config.components.bar).toBe(barModule.components.bar);
		expect(config.components.baz).toBe(bazModule.components.baz);
	});
	it('should throw if module has no id', async () => {
		const fooModule = { components: { foo: vi.fn() } };
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
