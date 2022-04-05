import React from 'react';
import cmf from '@talend/react-cmf';

let cmfBootstrapCache;
export const configureCmfModules = (modules, settings) => ({
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
	decorator: (Story, { loaded: { store, App }, ...context }) =>
		React.createElement(App, { store, registry: cmf.registry.getRegistry() }, [
			React.createElement(Story, { ...context, key: 'story' }),
		]),
});
