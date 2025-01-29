module.exports = {
	output: {
		filename: 'index.js',
	},
	resolve: {
		fallback: {
			path: false,
		},
		alias: {
			'json-refs': require.resolve('json-refs/dist/json-refs.js'),
		},
	},
};
