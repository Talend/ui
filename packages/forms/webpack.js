/**
 * This webpack config is exposed to let brace fetch its own plugins.
 * So here we just copy assets.
 * @example
const form = require('@talend/react-forms/webpack');

module.exports = {
	// ... your current config
	plugins: [].concat(
    // ... your plugins
    form.plugins,
  ),
};
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const brace = path.dirname(require.resolve('brace'));

/**
 * react ace try to fetch resources but name are differents in sources
 * lets create a simple function to transform the name in assets
 */
function transformPath(targetPath) {
	const fn = path.basename(targetPath);
	const type = path.dirname(targetPath).split('/').pop();
	const newPath = [type, fn].join('-');
	return newPath;
}

module.exports = {
	plugins: [
		new CopyWebpackPlugin([{ from: `${brace}/mode/*.js`, transformPath }]),
		new CopyWebpackPlugin([{ from: `${brace}/theme/*.js`, transformPath }]),
		new CopyWebpackPlugin([{ from: `${brace}/snippets`, to: 'snippets/' }]),
	],
};
