const path = require('path');

module.exports = (env = {}) => ({
	mode: env.production ? 'production': 'development',
	context: path.resolve(__dirname),
	entry: {
        Info: './dist/info.js',
        React: './dist/react.js',
    },
	output: {
        path: path.resolve(__dirname, './dist'),
        library: 'Talend[name]Icons',
        libraryTarget: 'umd',
        filename: `Talend[name]Icons${env.production ? '.min': ''}.js`,
        globalObject: 'this'
	},
	module: {
		rules: [
		],
	},
	plugins: [
	],
	node: {
		fs: 'empty',
	},
});
