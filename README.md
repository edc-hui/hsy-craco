# hsy-craco
基于webpack 5 封装的自动化构建工作流

# 安装
```bash
yarn add @huisiyu/hssy-craco -D
```

# 使用
- 开发模式下：hsy-craco start
- 生产模式下：hsy-craco build

# 注意事项
根目录下必须有src目录，src下面index.js文件为入口js文件

# 自定义配置
- 项目根目录下创建hsycraco.config.js文件

```javascript
module.exports = {
    devServer: {
        open: true,
        port:3333,
        proxy: {
            "/*": "http://www.baidu.com/"
        }
    },
}
```
