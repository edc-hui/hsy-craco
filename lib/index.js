const devConfig = require('../config/webpack.dev')
const buildConfig = require('../config/webpack.pro')
module.exports = {
    devConfig,
    buildConfig
}

console.log("测试lib文件夹有没有发布上去")