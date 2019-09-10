import merge from './cmfModule.merge';

function find(options, buff = {}) {
	if (options.modules) {
		return options.modules.reduce((acc, current) => {
			if (!current.id) {
				throw new Error('a cmf.module must have an id');
			}
			if (!acc[current.id]) {
				// eslint-disable-next-line no-param-reassign
				acc[current.id] = current;
			}
			find(current, buff);
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
	return merge(...Object.values(modules), options);
}
