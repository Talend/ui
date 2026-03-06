describe('redux action - rr5 mode', () => {
	beforeEach(() => {
		delete process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY;
		vi.resetModules();
		vi.doUnmock('react-router-dom');
	});

	it('should return cmf router action on push', async () => {
		// given
		const url = '/lol/mdr';
		const { push } = await import('./index');

		// when
		const action = push(url, null, { type: 'REDIRECT' });

		// then
		expect(action).toEqual({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				args: [url, null],
				method: 'push',
			},
		});
	});

	it('should return cmf router action on replace', async () => {
		// given
		const url = '/lol/mdr';
		const { replace } = await import('./index');

		// when
		const action = replace(url, null, { type: 'REDIRECT' });

		// then
		expect(action).toEqual({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				args: [url, null],
				method: 'replace',
			},
		});
	});
});
