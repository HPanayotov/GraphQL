const path = require('path');
const webpack = require('webpack');
const regeneratorRuntime = require("regenerator-runtime");
module.exports = {

    entry: ['babel-polyfill','./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /(\.css)$/,
                exclude: /node_modules/,
                // loader: 'style-loader',
                use: ['style-loader', 'css-loader']
            },
        ],
    },
};