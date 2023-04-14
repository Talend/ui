import bootstrap from '../bootstrap';
import registry from '../registry';

export async function prepareCMF(jsx, opts = {}) {
	// reset global registry
	const reg = registry.getRegistry();
	reg._registry = {};
	reg._isLocked = false;

	function Wrapper() {
		return jsx;
	}
	const config = await bootstrap({
		RootComponent: Wrapper,
		render: false,
		modules: [opts?.cmfModule || { id: 'empty' }],
	});
	config.saga.run();
	return (
		<config.App
			store={config.store}
			loading={opts.AppLoader}
			withSettings={!!opts.settingsURL}
			registry={registry.getRegistry()}
		>
			{jsx}
		</config.App>
	);
}
