const {merge} = require('webpack-merge');
const path = require('path')
const common = require('./webpack.common')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cwd = process.cwd();

/**
 * 获取处理样式的Loaders
 * @param cssLoaderOptions  css-loader 的options
 * @param otherLoader sass or less
 * @returns {[*, {loader: string, options: *}, {loader: string, options: {postcssOptions: {plugins: [string]}}}]}
 */
const getStyleLoaders = (cssLoaderOptions, otherLoader = '') => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: cssLoaderOptions
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    plugins: [
                        require.resolve('postcss-preset-env')
                    ]
                }
            }
        }
    ];
    switch (otherLoader) {
        case "sass":
            loaders.push(require.resolve('sass-loader'))
            loaders.push({
                loader: require.resolve('sass-resources-loader'),
                options: {
                    resources: [path.join(cwd, 'src/assets/scss/_variables.scss')]
                }
            })
            break;
        default:
            break;
    }
    return loaders;
}

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: getStyleLoaders({
                    importLoaders: 1
                })
            },
            {
                test: /\.module\.css$/,
                use: getStyleLoaders({
                    modules: true,
                    importLoaders: 1
                })
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: getStyleLoaders({
                    importLoaders: 3
                }, 'sass'),
            },
            {
                test: /\.module\.scss$/,
                use: getStyleLoaders({
                    modules: true,
                    importLoaders: 3
                }, 'sass')
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
})