
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'react-immutable-proptypes.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  output: {
    filename: 'ReactImmutableProptypes.min.js',
    path: path.join('/Users/jmfrancois/github/talend/ui/packages/components', 'dist/cdn', 'react-immutable-proptypes/2.2.0'),
    library: 'ReactImmutableProptypes',
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
            