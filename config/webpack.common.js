const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const cwd = process.cwd();

module.exports = {
    entry: path.join(cwd, 'src/index.js'),
    output: {
        filename: "[name].[fullhash:8].js",
        path: path.join(cwd, 'dist')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
                type: "asset/resource"
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