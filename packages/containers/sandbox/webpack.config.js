const conf = require('@talend/react-forms/webpack-plugins');

module.exports = {
	output: {
		chunkFilename: '[name].chunk.js',
	},
	plugins: conf.plugins,
};
