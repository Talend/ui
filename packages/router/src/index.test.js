import getModule from './index';

describe('getModule', () => {
	it('should support routerFunctions', () => {
		const routerFunctions = {
			foo: jest.fn(),
		};
		const mod = getModule({ routerFunctions });
		expect(mod.cmfModule.registry).toEqual({ '_.route.hook:foo': routerFunctions.foo });
	});
});
