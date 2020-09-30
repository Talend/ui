import merge from './cmfModule.merge';

async function getModule(module) {
	const { init, ...syncModule } = module;
	if (init) {
		const asyncModule = await init();
		return {
			...syncModule,
			...asyncModule,
		};
	}
	return syncModule;
}

async function find(options, buff = []) {
	if (options.modules) {
		for await (const current of options.modules) {
			if (!current.id) {
				throw new Error('a cmf.module must have an id');
			}

			if (buff.some(({ id }) => current.id === id)) {
				// eslint-disable-next-line no-console
				console.warn(
					`cmf.bootstrap: 2 modules have the same id ${current.id}. This duplicated module will be skipped.`,
				);
			} else {
				const module = await getModule(current);
				buff.push(module);
				await find(module, buff);
			}
		}
	}
	return buff;
}

/**
 * This function find all modules then it merge all configurations
 * @return {Object} the configuration for cmf.bootstrap
 */
export default async function mergeModulesAndApp(options) {
	const modules = await find(options);
	return merge(...modules, options);
}

mergeModulesAndApp.merge = merge;
