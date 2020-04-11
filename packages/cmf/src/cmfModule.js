import merge from './cmfModule.merge';

function find(options, buff = []) {
	if (options.modules) {
		return options.modules.reduce((acc, current) => {
			if (!current.id) {
				throw new Error('a cmf.module must have an id');
			}
			if (acc.some(({ id }) => current.id === id)) {
				console.warn(
					`cmf.bootstrap: 2 modules have the same id ${current.id}. This duplicated module will be skipped.`,
				);
			} else {
				acc.push(current);
				find(current, buff);
			}
			return acc;
		}, buff);
	}
	return buff;
}

/**
 * This function find all modules then it merge all configurations
 * @return {Object} the configuration for cmf.bootstrap
 */
export default function mergeModulesAndApp(options) {
	const modules = find(options);
	return merge(...modules, options);
}
