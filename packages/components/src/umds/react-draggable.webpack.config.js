
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'react-draggable.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  output: {
    filename: 'ReactDraggable.min.js',
    path: path.join('/Users/jmfrancois/github/talend/ui/packages/components', 'dist/cdn', 'react-draggable/3.3.2'),
    library: 'ReactDraggable',
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
            