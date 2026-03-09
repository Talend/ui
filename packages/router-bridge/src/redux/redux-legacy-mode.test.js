describe('redux action - legacy mode', () => {
	beforeEach(() => {
		process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY = 'true';
		vi.resetModules();
	});

	afterEach(() => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
	});

	it('should return cmf router action on push', async () => {
		// given
		const url = '/lol/mdr';
		const type = 'REDIRECT';
		const { push } = await import('./index');

		// when
		const action = push(url, null, { type });

		// then
		expect(action).toEqual({
			type,
			cmf: {
				routerPush: url,
			},
		});
	});

	it('should return cmf router action on replace', async () => {
		// given
		const url = '/lol/mdr';
		const type = 'REDIRECT';
		const { replace } = await import('./index');

		// when
		const action = replace(url, null, { type });

		// then
		expect(action).toEqual({
			type,
			cmf: {
				routerReplace: url,
			},
		});
	});
});
