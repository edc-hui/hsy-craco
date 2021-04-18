const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const cwd = process.cwd();

/**
 * 获取处理样式的Loaders
 */
const getStyleLoaders = (cssLoaderOptions, otherLoader = '') => {
    const loaders = [
        require.resolve('style-loader'),
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
                            require.resolve('@babel/plugin-syntax-dynamic-import')
                        ],
                        cacheDirectory: true,
                        cacheCompression: false
                    },
                }
            },
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