const path = require('path');

module.exports = (env = {}) => ({
	mode: 'production',
	optimization: {
		minimize: !!env.optimize,
	},
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, './dist'),
		filename: env.optimize ? 'coral.min.js' : 'coral.js',
		library: 'TalendCoral',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				use: [
					{ loader: 'cache-loader' },
					{
						loader: 'babel-loader',
						options: { configFile: './.babelrc.json' },
					},
					{
						loader: 'ts-loader',
						options: {
							// disable type checker - it is done in another process by ForkTsCheckerWebpackPlugin
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'url-loader',
				options: {
					name: 'assets/svg/[name].[ext]',
					limit: 10000,
					mimetype: 'image/svg+xml',
				},
			},
		],
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-i18next': 'ReactI18next',
	},
});
