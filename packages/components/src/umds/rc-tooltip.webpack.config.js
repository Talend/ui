
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'rc-tooltip.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  output: {
    filename: 'RcTooltip.min.js',
    path: path.join('/Users/jmfrancois/github/talend/ui/packages/components', 'dist/cdn', 'rc-tooltip/3.7.3'),
    library: 'RcTooltip',
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
            