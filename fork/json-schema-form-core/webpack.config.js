module.exports = {
	output: {
		filename: 'index.js',
	},
	resolve: {
		fallback: {
			path: require.resolve('path-browserify'),
		},
	},
};
