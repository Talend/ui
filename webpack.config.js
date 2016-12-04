/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var library = 'JSONSchemaFormCore';
console.log('JSON Schema Form Core v' + pjson.version);

module.exports = {
  entry: [ './index.js' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'json-schema-form-core.js',
    library: library,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
  externals: {
    'tv4': 'var tv4',
  },
  plugins: [
    new webpack.BannerPlugin(
      'json-schema-form-core\n' +
      '@version ' + pjson.version + '\n' +
      '@link https://github.com/json-schema-form/json-schema-form-core\n' +
      '@license MIT\n' +
      'Copyright (c) 2016 JSON Schema Form')
  ]
};
