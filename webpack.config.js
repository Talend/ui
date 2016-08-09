const path = require('path');
const webpack = require('webpack');

const uglify = new webpack.optimize.UglifyJsPlugin();

const PATH = {
  src: path.join(__dirname, './src'),
  lib: path.join(__dirname, './lib'),
  dist: path.join(__dirname, './dist'),
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
const lib = Object.assign({}, CONFIG, {
  output: {
    libraryTarget: 'umd',
    library: 'ReactUIAbstration',
    filename: '[name].js',
    path: PATH.lib,
  },
  externals: {
    classnames: {
      root: 'classNames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
    'react-router': {
      root: 'Router',
      commonjs2: 'react-router',
      commonjs: 'react-router',
      amd: 'react-router',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
  },
});
const umd = Object.assign({}, lib, {
  output: {
    libraryTarget: 'umd',
    library: 'ReactUIAbstration',
    filename: 'react-ui-abstraction.js',
    path: PATH.lib,
  }
});
const umdMinified = Object.assign({}, umd, {
  output: {
    libraryTarget: 'umd',
    library: 'ReactUIAbstration',
    filename: 'react-ui-abstraction.min.js',
    path: PATH.lib,
  },
  plugins: [uglify],
});
module.exports = [umd, umdMinified];
