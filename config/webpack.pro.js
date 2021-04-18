const {merge} = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const cwd = process.cwd();
const {getStyleLoaders, getBabelLoaders} = require('../lib/utils')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: getBabelLoaders('production')
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: getStyleLoaders('production', {
                    importLoaders: 1
                })
            },
            {
                test: /\.module\.css$/,
                use: getStyleLoaders('production', {
                    modules: true,
                    importLoaders: 1
                })
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: getStyleLoaders('production', {
                    importLoaders: 3
                }, 'sass'),
            },
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders('production', {
                    modules: true,
                    importLoaders: 3
                }, 'sass')
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    }
})