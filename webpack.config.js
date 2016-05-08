/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
console.log('JSON Schema Form Core v' + pjson.version);

module.exports = {
  entry: [ './index.js' ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  resolve: { extensions: [ '', '.js' ] },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [ __dirname ],
        exclude: [ 'node_modules' ],
        loader: 'babel',
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('json-schema-form\n@version ' + pjson.version + '\nCopyright 2016 JSON Schema Form')
  ]
};
