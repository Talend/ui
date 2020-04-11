import merge from './cmfModule.merge';

async function find(options, buff = []) {
	if (options.modules) {
		for await (let current of options.modules) {
			if (typeof module === 'function') {
				current = await current();
			}

			if (!current.id) {
				throw new Error('a cmf.module must have an id');
			}
			if (buff.some(({ id }) => current.id === id)) {
				console.warn(
					`cmf.bootstrap: 2 modules have the same id ${current.id}. This duplicated module will be skipped.`,
				);
			} else {
				buff.push(current);
				await find(current, buff);
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
