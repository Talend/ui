const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractBootstrap = new ExtractTextPlugin('bootstrap.css', {
  allChunks: true,
});
const extractBootstrapMin = new ExtractTextPlugin('bootstrap.min.css', {
  allChunks: true,
});
const BOOT_PATH = `${__dirname}/node_modules/bootstrap-sass/assets/stylesheets`;
const THEME_PATH = `${__dirname}./src/theme`;

const BASE_CONF = {
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
    includePaths: [THEME_PATH, BOOT_PATH],
  },
  plugins: [extractBootstrap],
  devServer: {
    contentBase: './example',
  },
};

const MINIFIED = Object.assign({}, BASE_CONF, {
  module: {
    loaders: [{
      test: /bootstrap\.scss$/,
      loader: extractBootstrapMin.extract('style', 'css?minimize!sass'),
    }],
  },
  plugins: [extractBootstrapMin],
});

module.exports = [BASE_CONF, MINIFIED];
