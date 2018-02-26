module.exports = {
	output: {
		path: `${process.cwd()}/build`,
	},
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
	},
	devServer: {
		port: 3000,
		proxy: {
			'/api': {
				target: process.env.TALEND_API_URL || 'http://localhost',
				changeOrigin: true,
				secure: false,
			},
		},
		historyApiFallback: true,
	},
};
