/* global __dirname */
// var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  resolve: {extensions: ['', '.js']},
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [__dirname],
        exclude: ['node_modules'],
        loader: 'babel',
      }
    ]
  },
  externals: {
      'objectpath': 'objectpath'
  }
};
