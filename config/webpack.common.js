const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const WebpackBar = require('webpackbar');

const {getCustomConfig} = require("../lib/utils")
const cwd = process.cwd();

const configObj = getCustomConfig();
console.log(configObj, '配置对象')

module.exports = {
    entry: configObj.entry,
    output: configObj.output,
    target: configObj.target,
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
                // type: "asset/resource",
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.svg$/,
                type: "asset/inline"
            },
            {
                test: /\.txt$/,
                type: "asset/source"
            },
        ]
    },
    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            template: path.join(cwd, 'public/index.html'),
            filename: "index.html",
            publicPath: './'
        }),
        // new ESLintPlugin({
        //     overrideConfigFile: require.resolve('../.eslintrc.js') // 指定一个eslint的配置文件
        // }),
        // new StylelintWebpackPlugin({
        //     configFile: require.resolve('../.stylelintrc.js')  // 指定一个stylelint的配置文件
        // })
    ]
}