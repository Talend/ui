const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const licenceTemplate = require('./licence');

const libraryName = 'react-flow-designer';

const PATH = {
    src: path.join(__dirname, '/src'),
    lib: path.join(__dirname, './lib'),
};

const css = 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

const sass = `${css}!sass`;
const extractCSS = new ExtractTextPlugin({ filename: 'style.css', allChuncks: true });
const uglify = new UglifyJsPlugin({ minimize: true });
const license = new webpack.BannerPlugin(licenceTemplate);

const CONFIG = {
    entry: path.join(PATH.src, 'index.js'),
    devtool: 'source-map',
    externals: {
        'immutable': 'immutable',
		'lodash': 'lodash',
        'react': 'react',
        'react-dom': 'react-dom',
        'react-redux': 'react-redux',
        'redux': 'redux',
        'reselect': 'reselect',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react'],
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader',
                }),
                exclude: /node_modules/,
            }, {
                test: /\.scss$/,
                loader: extractCSS.extract({ fallbackLoader: 'style', loader: sass }),
            },
        ],
    },
    plugins: [extractCSS, license],
};

const umd = Object.assign({}, CONFIG, {
    output: {
        libraryTarget: 'umd',
        library: libraryName,
        filename: `${libraryName}.js`,
        path: PATH.lib,
    },
});

const umdMinified = Object.assign({}, umd, {
    output: {
        libraryTarget: 'umd',
        library: libraryName,
        filename: `${libraryName}.min.js`,
        path: PATH.lib,
    },
    plugins: [extractCSS, uglify, license],
});


module.exports = [umd, umdMinified];
