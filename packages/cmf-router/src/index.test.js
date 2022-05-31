import getModule from './index';

describe('getModule', () => {
	it('should support multiple args', () => {
		const config = {
			sagaRouterConfig: {
				'/foo': jest.fn(),
			},
		};
		const configBis = {
			sagaRouterConfig: {
				'/foo/bar': jest.fn(),
			},
		};
		const mod = getModule(config, configBis);
		const generator = mod.cmfModule.saga();
		generator.next();
		const result = generator.next();
		expect(result.value.payload.args[1]).toEqual({
			'/foo': config.sagaRouterConfig['/foo'],
			'/foo/bar': configBis.sagaRouterConfig['/foo/bar'],
		});
	});
});
