const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: './src/globalStyles.scss',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'globalStyles.min.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                            sourceMap: true,
                        },
                    },
                    { loader: 'resolve-url-loader', options: { sourceMap: true } },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    }
                ]
            }
        ]
    }
};
