import getModule from './index';

describe('getModule', () => {
	it('should support routerFunctions', () => {
		const routerFunctions = {
			foo: jest.fn(),
		};
		const mod = getModule({ routerFunctions });
		expect(mod.cmfModule.registry).toEqual({ '_.route.hook:foo': routerFunctions.foo });
	});
	it('should support multiple args', () => {
		const config = {
			routerFunctions: {
				foo: jest.fn(),
			},
			sagaRouterConfig: {
				'/foo': jest.fn(),
			},
		};
		const configBis = {
			routerFunctions: {
				bar: jest.fn(),
			},
			sagaRouterConfig: {
				'/foo/bar': jest.fn(),
			},
		};
		const mod = getModule(config, configBis);
		expect(mod.cmfModule.registry).toEqual({
			'_.route.hook:foo': config.routerFunctions.foo,
			'_.route.hook:bar': configBis.routerFunctions.bar,
		});
		const generator = mod.cmfModule.saga();
		generator.next();
		const result = generator.next();
		expect(result.value.FORK.args[1]).toEqual({
			'/foo': config.sagaRouterConfig['/foo'],
			'/foo/bar': configBis.sagaRouterConfig['/foo/bar'],
		});
	});
});
