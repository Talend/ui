const mergeWith = require('lodash.mergeWith');
const defaultConfig = require('./webpack.config');


// Default configuration file
const configurationFiles = [defaultConfig];

// Dev configuration file
if (process.env.TALEND_MODE === 'development') {
	configurationFiles.push(require('./webpack.config.dev'));
}

// App configuration file
const appConfigPath = process.env.TALEND_APP_CONFIG;
if (appConfigPath) {
	console.log(`Merge ${process.env.TALEND_MODE} webpack config with app custom one (${appConfigPath})`);
	configurationFiles.push(require(appConfigPath));
}

module.exports = mergeWith({}, ...configurationFiles, function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
});
