import React from 'react';

/**
 * CMF configuration options
 */
export interface CMFOptions {
	/**
	 * CMF modules to bootstrap
	 */
	modules: any;

	/**
	 * CMF settings to apply
	 */
	settings?: any;
}

// Cache for CMF bootstrap to prevent multiple initializations
let cmfBootstrapCache: { store: any; App: any } | undefined;

/**
 * Configure CMF (Component Metadata Framework) modules for Storybook
 *
 * @param modules - CMF modules to bootstrap
 * @param settings - Optional CMF settings
 * @returns Object with loader and decorator functions
 *
 * @example
 * ```typescript
 * import { configureCmfModules } from '@talend/storybook-config';
 *
 * const { loader, decorator } = configureCmfModules(
 *   [MyModule1, MyModule2],
 *   { views: { ... } }
 * );
 * ```
 */
export function configureCmfModules(modules: any, settings?: any) {
	// Import CMF dynamically to avoid requiring it if not used
	// This allows the package to work without CMF as a dependency
	let cmf: any;
	try {
		cmf = require('@talend/react-cmf');
	} catch (e) {
		throw new Error('@talend/react-cmf must be installed to use CMF configuration');
	}

	return {
		loader: async () => {
			// cmf is a singleton. There are tons of consequences running a bootstrap and saga run multiple times
			// - warnings for each override in registry
			// - sagas are spawned but never canceled
			// - app may not work as expected
			if (cmfBootstrapCache) {
				return cmfBootstrapCache;
			}

			const { store, saga, App } = await cmf.bootstrap({
				render: false,
				modules,
			});
			saga.run();
			if (settings) {
				store.dispatch(cmf.actions.settings.receiveSettings(settings));
			}
			cmfBootstrapCache = { store, App };
			return cmfBootstrapCache;
		},
		decorator: (Story: any, { loaded, ...context }: any) => {
			const { store, App } = loaded;
			return React.createElement(App, { store, registry: cmf.registry.getRegistry() }, [
				React.createElement(Story, { ...context, key: 'story' }),
			]);
		},
	};
}
