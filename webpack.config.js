/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var pjson = require('./package.json');
var library = 'JSONSchemaFormCore';
console.log('JSON Schema Form Core v' + pjson.version);
const plugins = [
  new webpack.BannerPlugin(
    'json-schema-form-core\n' +
    '@version ' + package.version + '\n' +
    '@date ' + buildDate.toUTCString() + '\n' +
    '@link https://github.com/json-schema-form/json-schema-form-core\n' +
    '@license MIT\n' +
    'Copyright (c) 2014-' + buildDate.getFullYear() + ' JSON Schema Form'),
  /* Minification only occurs if the output is named .min */
  new webpack.optimize.UglifyJsPlugin(
    {
      include: /\.min\.js$/,
      minimize: true
    })
];

module.exports = {
  entry: {
    "lib": './src/lib/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'json-schema-form-core.js',
    library: library,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      path.join(__dirname, "src/lib"),
      "node_modules"
    ],
    extensions: [ '.ts', '.js' ]
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ["es2015", { "modules": false }]
            ],
            plugins: [ "transform-flow-strip-types" ]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.ts/,
        use: [ 'babel-loader', 'ts-loader' ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  externals: {
    'tv4': 'var tv4',
  },
  plugins: plugins
};
