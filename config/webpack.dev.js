const {merge} = require('webpack-merge');
const webpack = require('webpack')
const common = require('./webpack.common')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path')
const cwd = process.cwd();
const {getStyleLoaders, getBabelLoaders, getCustomConfig} = require('../lib/utils')
const configObj = getCustomConfig();
module.exports = merge(common, {
    mode: 'development',
    devtool: configObj.devtool.development,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: getBabelLoaders('development')
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: getStyleLoaders('development', {
                    importLoaders: 1
                })
            },
            {
                test: /\.module\.css$/,
                use: getStyleLoaders('development', {
                    modules: true,
                    importLoaders: 1
                })
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: getStyleLoaders('development', {
                    importLoaders: 3
                }, 'sass'),
            },
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders('development', {
                    modules: true,
                    importLoaders: 3
                }, 'sass')
            },
        ]
    },
    plugins: [
        new ReactRefreshPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: configObj.devServer
})