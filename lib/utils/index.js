const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cwd = process.cwd();
const fs = require("fs");
const {merge} = require('webpack-merge');
/**
 * 获取处理样式的Loaders
 * @param env  当前所处环境 development or production
 * @param cssLoaderOptions  css-loader 的options
 * @param otherLoader sass or less
 * @returns {[*, {loader: string, options: *}, {loader: string, options: {postcssOptions: {plugins: [string]}}}]}
 */
const getStyleLoaders = (env, cssLoaderOptions, otherLoader = '') => {
    const loaders = [
        env === 'production' ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
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

/**
 * 获取babel-loader
 * @param env  当前所处环境 development or production
 * @returns {{loader: string, options: {cacheCompression: boolean, presets: [string, string], plugins, cacheDirectory: boolean}}}
 */
const getBabelLoaders = (env) => {
    const plugins = [
        require.resolve('@babel/plugin-syntax-dynamic-import')
    ];
    if (env === 'development') {
        plugins.push(require.resolve('react-refresh/babel'))
    }
    const loader = {
        loader: require.resolve('babel-loader'),
        options: {
            presets: [
                require.resolve('@babel/preset-react'),
                require.resolve('@babel/preset-env')
            ],
            plugins,
            cacheDirectory: true,
            cacheCompression: false
        },
    };
    return loader;
}

/**
 * 获取用户的自定义的配置文件
 * @returns {{}}
 */
const getCustomConfig = () => {
    const config = {
        entry: path.join(cwd, 'src/index.js'),
        output: {
            filename: "[name].[fullhash:8].js",
            path: path.join(cwd, 'dist')
        },
        target: 'web',
        devServer: {
            open: false,
            port: 3000,
            hotOnly: true,
        },
        devtool: {
            development: 'eval-cheap-module-source-map',
            production: false
        }
    };
    const configFileExit = fs.existsSync(path.join(cwd, 'hsycraco.config.js'));
    if (configFileExit) {
        const cracoConfig = require(`${path.join(cwd, 'hsycraco.config.js')}`);
        return merge(config, cracoConfig)
    }
    return config;
}

module.exports = {
    getStyleLoaders,
    getBabelLoaders,
    getCustomConfig
}