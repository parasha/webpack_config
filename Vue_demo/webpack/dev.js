const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

const base = require('./base');
const config = {
    mode: 'development',
    devServer: {
        https: true,
        // host: 'localhost',  // 访问地址
        host: 'm2.qschou.com',  // 访问地址
        // port: '8001',  // 访问端口
        open: true, // 自动拉起浏览器
        hot: true, // 热加载
        proxy: {
            "/v3.0.0": {
                target: "https://gateway.qschou.com",
                changeOrigin: true,
                secure: false,
            },
        }
    },
    plugins: [
        // 提供一些全局变量，但是格式有点怪
        new webpack.DefinePlugin({
            API: JSON.stringify('')
        }),
        new webpack.HotModuleReplacementPlugin() //热更新
    ],
    optimization: {
        minimize: false
    }
}

module.exports = merge(base, config)