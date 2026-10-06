describe('router bridge - rr5 mode', () => {
	beforeEach(() => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
		vi.resetModules();
		vi.doUnmock('react-router');
	});

	it('should not export react router v5 implementation', async () => {
		// when
		const { history, Route, isLegacy } = await import('./index');
		// the bridge uses require(): compare with the same (CJS) instance
		const reactRouterDom = require('react-router');

		// then
		expect(history).toBeDefined();
		expect(Route).toBeTypeOf('function');
		expect(Route).toBe(reactRouterDom.Route);
		expect(isLegacy).toBe(false);
	});
});
