var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var env = require('yargs').argv.mode;
const licenceTemplate = require('./licence');

var libraryName = 'react-flow-designer';

var plugins = [], outputFile;
exports.default = function(options){
    if (options.build) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
    } else {
    outputFile = libraryName + '.js';
    }

    plugins.push(new ExtractTextPlugin('style.css'));

    plugins.push(new webpack.BannerPlugin(licenceTemplate));

    return {
        entry: __dirname + '/src/index.js',
        devtool: 'source-map',
        output: {
            path: __dirname + '/lib',
            filename: outputFile,
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        externals: {
            "immutable": "immutable",
            "react": "react",
            "react-dom": "react-dom",
            "react-redux": "react-redux",
            "redux": "redux",
            "reselect": "reselect"
        },
        module: {
            loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'}),
                exclude: /node_modules/
            }
            ]
        },
        resolve: {
            root: path.resolve('./src'),
            extensions: ['', '.js', '.jsx']
        },
        plugins: plugins
    };
}