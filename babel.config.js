module.exports = function babel(api) {
	const isTest = api && api.env('test');
	if (api) {
		api.cache(true);
	}
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['>0.25%', 'not op_mini all', 'IE 11'],
				},
			},
		],
		'@babel/preset-react',
	];
	const plugins = [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-object-assign',
		'@babel/plugin-proposal-object-rest-spread',
		isTest ? 'dynamic-import-node' : '@babel/plugin-syntax-dynamic-import',
	];
	const ignore = ['**/**/*.css'];

	return {
		presets,
		ignore,
		plugins,
	};
};
