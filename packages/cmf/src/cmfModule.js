import merge from './cmfModule.merge';

async function getModule(module) {
	const { asyncInit, ...syncModule } = module;
	if (asyncInit) {
		const asyncModule = await asyncInit();
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

			// prevent module duplication
			if (!buff.some(({ id }) => current.id === id)) {
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
