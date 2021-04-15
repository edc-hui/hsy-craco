const {merge} = require('webpack-merge');
const webpack = require('webpack')
const common = require('./webpack.common')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path')
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: [
                            require.resolve('@babel/preset-react'),
                            require.resolve('@babel/preset-env')
                        ],
                        plugins: [
                            require.resolve('react-refresh/babel')
                        ],
                        cacheDirectory: true,
                        cacheCompression: false
                    },
                }
            },
        ]
    },
    plugins: [
        new ReactRefreshPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        open: false,
        port: 3000,
        hotOnly: true,
    }
})