const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractBootstrap = new ExtractTextPlugin('bootstrap.css', {
  allChunks: true,
});
const BOOT_PATH = `${__dirname}/node_modules/bootstrap-sass/assets/stylesheets`;
const THEME_PATH = `${__dirname}./src/theme`;

module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bootstrap.js',
  },
  resolve: ['', '.scss', '.css', '.js'],
  module: {
    loaders: [{
      test: /bootstrap\.scss$/,
      loader: extractBootstrap.extract('style', 'css!sass'),
    }],
  },
  sassLoader: {
    includePaths: [BOOT_PATH, THEME_PATH],
  },
  plugins: [
    extractBootstrap,
  ],
};
