const path = require('path');

module.exports = (env = {}) => ({
	mode: env.production ? 'production': 'development',
	context: path.resolve(__dirname),
	entry: './src/umd.js',
	output: {
        path: path.resolve(__dirname, './dist'),
        library: 'TalendIcons',
        libraryTarget: 'umd',
        filename: `TalendIcons${env.production ? '.min': ''}.js`,
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
	externals: {
		react : {
			commonjs: 'react',
		    commonjs2: 'react',
			amd: 'react',
			root: 'React'
		  }
	},
});
