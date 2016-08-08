const path = require('path');
const webpack = require('webpack');

const uglify = new webpack.optimize.UglifyJsPlugin();

const PATH = {
  src: path.join(__dirname, './src'),
  lib: path.join(__dirname, './lib'),
  root: path.join(__dirname, './'),
};


const CONFIG = {
  entry: path.join(PATH.src, 'index.js'),
  externals: {
    react: 'React',
  },
  devServer: {
    contentBase: PATH.root,
    inline: true,
    port: 3000,
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
const umd = Object.assign({}, CONFIG, {
  output: {
    libraryTarget: 'umd',
    library: 'ReactUIAbstrationBootstrap',
    filename: 'react-ui-abstraction-bootstrap.js',
    path: PATH.lib,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-ui-abstraction': {
      root: 'ReactUIAbstration',
      commonjs2: 'react-ui-abstraction',
      commonjs: 'react-ui-abstraction',
      amd: 'react-ui-abstraction',
    },
  },
});
const umdMinified = Object.assign({}, umd, {
  output: {
    libraryTarget: 'umd',
    library: 'ReactUIAbstrationBootstrap',
    filename: 'react-ui-abstraction-bootstrap.min.js',
    path: PATH.lib,
  },
  plugins: [uglify],
});
module.exports = [umd, umdMinified];
