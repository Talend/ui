const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

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
		new CopyWebpackPlugin([{ from: 'node_modules/brace/mode/*.js', transformPath }]),
		new CopyWebpackPlugin([{ from: 'node_modules/brace/theme/*.js', transformPath }]),
		new CopyWebpackPlugin([{ from: 'node_modules/brace/snippets', to: 'snippets/' }]),
	],
};
