const path = require('path');

module.exports = (on, config) => {
	if (config.testingType === 'component') {
		// eslint-disable-next-line global-require
		const { startDevServer } = require('@cypress/webpack-dev-server');

		const webpackConfig = {
			entry: './src/index.js',
			module: {
				rules: [
					{
						test: /\.s[ac]ss$/i,
						use: ['style-loader', 'css-loader', 'sass-loader'],
					},
					{
						test: /\.css$/i,
						use: ['style-loader', 'css-loader'],
					},
					{
						test: /\.js|\.jsx|\.ts|\.tsx$/,
						use: {
							loader: 'babel-loader',
						},
						exclude: /node_modules/,
					},
					{
						test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
						loader: 'url-loader',
						options: {
							mimetype: 'application/font-woff',
						},
					},
				],
			},
			resolve: {
				extensions: ['.tsx', '.ts', '.js', '.jsx'],
				alias: {
					'~docs': path.resolve(__dirname, '../../.storybook/docs'),
				},
			},
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'dist'),
			},
		};

		on('dev-server:start', options => startDevServer({ options, webpackConfig }));
	}

	return config;
};
