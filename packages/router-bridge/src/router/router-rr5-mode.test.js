describe('router bridge - rr5 mode', () => {
	beforeEach(() => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
		vi.resetModules();
		vi.doUnmock('react-router-dom');
	});

	it('should not export react router v5 implementation', async () => {
		// when
		const { history, Route, isLegacy } = await import('./index');
		const reactRouterDom = await import('react-router-dom');

		// then
		expect(history).toBeDefined();
		expect(Route).toBeTypeOf('function');
		expect(Route).toBe(reactRouterDom.Route);
		expect(isLegacy).toBe(false);
	});
});
