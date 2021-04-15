#!/usr/bin/env node
const Module = require('module');
const WebpackCLI = require('webpack-cli/lib/webpack-cli');
const args = process.argv;
const cli = new WebpackCLI();
const originalModuleCompile = Module.prototype._compile;
cli._originalModuleCompile = originalModuleCompile;
switch (args[2]) {
    case "start":
        const devArgs = [
            args[0],
            args[1],
            'serve',
            '--config',
            require.resolve('../config/webpack.dev.js')
        ]
        cli.run(devArgs)
        break;
    case "build":
        const buildArgs = [
            args[0],
            args[1],
            '--config',
            require.resolve('../config/webpack.pro.js')
        ]
        cli.run(buildArgs)
        break;
    default:
        console.error("请输入正确的命令\n开发模式：hsy-craco start\n生产模式：hsy-craco build")
        break;
}