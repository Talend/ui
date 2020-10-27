
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'webpack-cli.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  output: {
    filename: 'WebpackCli.min.js',
    path: path.join('/Users/jmfrancois/github/talend/ui/packages/components', 'dist/cdn', 'webpack-cli/3.3.12'),
    library: 'WebpackCli',
    libraryTarget: 'umd',
  },
  externals: {['react']: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React',
		},['react-dom']: {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDom',
		},}
};
            