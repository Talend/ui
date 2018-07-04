const path = require('path');
const mockBackend = require('./mockBackend/server');

const webpackConfig = {
	devServer: {
		before: mockBackend,
	},
	resolve: {
		alias: {
			// '@talend/bootstrap-theme': 'node_modules/@talend/bootstrap-theme',
			'@talend/bootstrap-theme': path.join(__dirname, 'node_modules/@talend/bootstrap-theme'),
		},
	},
};

module.exports = webpackConfig;
