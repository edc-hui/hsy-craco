const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();
module.exports = {
    entry: path.join(cwd, 'src/index.js'),
    output: {
        filename: "[name].[hash:8].js",
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
                        cacheDirectory: true,
                        cacheCompression: false
                    },
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
                use: {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 1024 * 10,
                        name: '[name].[fullhash:8].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader')
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(cwd, 'public/index.html'),
            filename: "index.html",
            publicPath: './'
        })
    ]
}