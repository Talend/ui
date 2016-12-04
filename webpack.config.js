/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var library = 'JSONSchemaFormCore';
console.log('JSON Schema Form Core v' + pjson.version);

module.exports = {
  entry: {
    "app": './src/app/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'json-schema-form-core.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/app"),
      "node_modules"
    ],
    extensions: [ '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ["es2015", { "modules": false }]
            ]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.ts/,
        use: [ 'ts-loader' ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  externals: {
    'tv4': 'var tv4',
  },
  plugins: [
    new webpack.BannerPlugin(
      'json-schema-form-core\n' +
      '@version ' +
      pjson.version + '\n' +
      '@link https://github.com/json-schema-form/json-schema-form-core\n' +
      '@license MIT\n' +
      'Copyright (c) 2016 JSON Schema Form')
  ]
};
