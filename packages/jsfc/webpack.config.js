/* global __dirname */
const webpack = require('webpack');
const path = require('path');
const packageJSON = require('./package.json');
const buildDate = new Date();
console.log('JSON Schema Form Core v' + packageJSON.version);
const plugins = [
    new webpack.BannerPlugin(
        'json-schema-form-core\n' +
        '@version ' +
        packageJSON.version +
        '\n' +
        '@date ' +
        buildDate.toUTCString() +
        '\n' +
        '@link https://github.com/json-schema-form/json-schema-form-core\n' +
        '@license MIT\n' +
        'Copyright (c) 2014-' +
        buildDate.getFullYear() +
        ' JSON Schema Form',
    ),
    /* Minification only occurs if the output is named .min */
    new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true,
    }),
];
const library = 'JSONSchemaFormCore';

module.exports = {
    entry: {
        'json-schema-form-core': [path.join(__dirname, 'src', 'module')],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library,
        libraryTarget: 'commonjs2',
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), path.join(__dirname, 'src/lib'), 'node_modules'],
        extensions: ['.ts', '.js'],
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [['es2015', { modules: false }]],
                            plugins: ['transform-flow-strip-types'],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.ts/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    externals: {
        tv4: 'var tv4',
    },
    plugins: plugins,
};
