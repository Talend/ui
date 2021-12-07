const CDNPlugin = require('@talend/dynamic-cdn-webpack-plugin');

module.exports = ({ config }) => {
	config.plugins.push(new CDNPlugin());
	return config;
};
