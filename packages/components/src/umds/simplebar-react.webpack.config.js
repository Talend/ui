
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'simplebar-react.index.js'),
  mode: 'production',
  optimization: {
   minimize: true,
  },
  output: {
    filename: 'SimplebarReact.min.js',
    path: path.join('/Users/jmfrancois/github/talend/ui/packages/components', 'dist/cdn', 'simplebar-react/1.2.3'),
    library: 'SimplebarReact',
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
            