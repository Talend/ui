const conf = require('@talend/react-forms/webpack');

module.exports = {
	output: {
		chunkFilename: '[name].chunk.js',
	},
	plugins: conf.plugins,
};
