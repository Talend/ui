const { defineConfig } = require('cypress');

const path = require('path');

const {
	getWebpackRules,
	getWebpackPlugins,
} = require('@talend/scripts-config-react-webpack/config/webpack.config.common');

const webpackConfig = {
	mode: 'development',
	entry: [path.join(__dirname, 'src', 'index.ts')],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: false,
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			url: false,
		},
		alias: {
			react: path.resolve(__dirname, './node_modules/react'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
		},
	},
	module: {
		rules: getWebpackRules(
			[path.resolve(process.cwd(), './src/'), path.resolve(process.cwd(), './cypress/')],
			true,
			true,
		),
	},
	plugins: getWebpackPlugins(),
};

module.exports = defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig,
		},
	},
});
