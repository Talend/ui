const path = require('path');

module.exports = ({ getUserConfig }) => ({
	mode: 'development',
	output: {
		path: `${process.cwd()}/build`,
	},
	module: {
		rules: [{
			test:	/.*\.js$/,
			enforce: 'pre',
			loader: 'eslint-loader',
			exclude: /node_modules/,
			options: { configFile: path.resolve(__dirname, '.eslintrc') },
		}],
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	devServer: {
		port: 3000,
		proxy: {
			'/api': {
				target: getUserConfig(['webpack', 'api-url'], 'http://localhost'),
				changeOrigin: true,
				secure: false,
			},
		},
		stats: 'errors-only',
		historyApiFallback: true,
	},
});
