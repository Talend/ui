const path = require('path');

module.exports = () => ({
	mode: 'development',
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	devServer: {
		port: 3000,
		stats: 'errors-only',
		historyApiFallback: true,
		contentBase: path.join(process.cwd(), '/dist'),
		compress: true,
		hot: true,
	},
	devtool: 'cheap-module-source-map',
});
