describe('router bridge - legacy mode', () => {
	beforeEach(() => {
		process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY = 'true';
		vi.resetModules();
	});

	afterEach(() => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
	});

	it('should not export any router implementation', async () => {
		// when
		const { history, Route, isLegacy } = await import('./index');

		// then
		expect(history).toBe(null);
		// eslint-disable-next-line
		expect(Route()).toBe(null);
		expect(isLegacy).toBe(true);
	});
});
