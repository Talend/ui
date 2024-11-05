module.exports = {
	presets: [
		[
			require.resolve('@babel/preset-env'),
			{
				modules: process.env.ESM === 'true' ? false : 'auto',
				targets:
					'last 1 year, not ie > 0, not samsung > 0, not opera > 0, not ios > 0, not op_mob > 0, not android > 0, not and_chr > 0, not and_ff > 0, not and_qq > 0',
			},
		],
		[require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
		[require.resolve('@babel/preset-typescript'), { allExtensions: true, isTSX: true }],
	],
	plugins: [
		require.resolve('@talend/babel-plugin-import-from-index'),
		require.resolve('@talend/babel-plugin-assets-api'),
		require.resolve('@babel/plugin-proposal-class-properties'),
		require.resolve('@babel/plugin-proposal-optional-chaining'),
		require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
		require.resolve('@babel/plugin-proposal-export-default-from'),
		require.resolve('@babel/plugin-proposal-export-namespace-from'),
		require.resolve('@babel/plugin-transform-object-assign'),
		[require.resolve('babel-plugin-angularjs-annotate'), { explicitOnly: true }],
	],
};
