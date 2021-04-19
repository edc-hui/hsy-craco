const {merge} = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const cwd = process.cwd();
const {getStyleLoaders, getBabelLoaders, getCustomConfig} = require('../lib/utils')
const configObj = getCustomConfig();
module.exports = merge(common, {
    mode: 'production',
    devtool: configObj.devtool.production,
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
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(cwd, 'public'),
                    to: configObj.output.path,
                    globOptions: {
                        ignore: ["**/index.html"]
                    },
                }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    }
})