const getBabelConfig = require('../../../babel.config');

module.exports = api => {
	const babelConfig = getBabelConfig(api);
	return {
		...babelConfig,
		plugins: [
			...babelConfig.plugins,
			['transform-rename-import', { original: '^(.+?)\\.scss$', replacement: '$1.css' }],
		],
	};
};
