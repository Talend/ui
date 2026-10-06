import getModule from './index';

describe('getModule', () => {
	it('should support multiple args', () => {
		const config = {
			sagaRouterConfig: {
				'/foo': vi.fn(),
			},
		};
		const configBis = {
			sagaRouterConfig: {
				'/foo/bar': vi.fn(),
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

describe('getModule module shape', () => {
	it('should expose cmfModule, RootComponent and history', () => {
		const mod = getModule();
		expect(mod.cmfModule.id).toBe('react-cmf-router');
		expect(Object.keys(mod.cmfModule.reducer)).toEqual(['router']);
		expect(mod.cmfModule.middlewares).toHaveLength(2);
		expect(mod.cmfModule.expressions['cmf.router.matchPath']).toBeDefined();
		expect(mod.RootComponent.displayName).toBe('CMFRouter');
		expect(typeof mod.history.listen).toBe('function');
	});

	it('should throw on routerFunctions (not supported anymore)', () => {
		expect(() => getModule({ routerFunctions: { foo: () => {} } })).toThrow(
			'routerFunctions is not supported',
		);
	});

	it('should only fork documentTitle without sagaRouterConfig', () => {
		const generator = getModule().cmfModule.saga();
		expect(generator.next().done).toBe(false); // fork documentTitle
		expect(generator.next().done).toBe(true);
	});

	it('should apply the basename to the history', () => {
		window.history.replaceState({}, '', '/');
		const mod = getModule({ basename: '/app' });
		mod.history.push('/foo');
		expect(mod.history.location.pathname).toBe('/app/foo');
	});

	it('should wait for startOnAction then start sagaRouter only once', () => {
		const routes = { '/foo': vi.fn() };
		const generator = getModule({
			sagaRouterConfig: routes,
			startOnAction: 'START',
		}).cmfModule.saga();
		generator.next(); // fork documentTitle
		const takeLatestEffect = generator.next().value;
		expect(takeLatestEffect.payload.args[0]).toBe('START');
		const startRouter = takeLatestEffect.payload.args[1];
		const first = startRouter();
		expect(first.next().value.payload.args[1]).toEqual(routes);
		expect(first.next().done).toBe(true);
		const second = startRouter();
		expect(second.next().done).toBe(true);
	});
});

describe('getModule exports', () => {
	it('should export routerAPI, sagaRouter and createBrowserHistory', async () => {
		const { routerAPI, sagaRouter, createBrowserHistory } = await import('./index');
		expect(typeof routerAPI.matchPath).toBe('function');
		expect(typeof routerAPI.selectors.getPath).toBe('function');
		expect(typeof sagaRouter).toBe('function');
		expect(typeof createBrowserHistory).toBe('function');
	});
});
