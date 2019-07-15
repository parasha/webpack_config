const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge');

const base = require('./base');

const staticPath = '../../../../static/';
const projectPath = 'project/projwallet/index/'

const config = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            API: JSON.stringify('https://getway.qschou.com')
        }),
        new CleanWebpackPlugin([
            path.resolve(__dirname, staticPath + 'js/v8/' + projectPath),
            path.resolve(__dirname, staticPath + 'html/v8/' + projectPath),
            path.resolve(__dirname, staticPath + 'css/v8/' + projectPath),
        ], { allowExternal: true }),
    ],
    // 还是没怎么搞明白
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    minSize: 0,
                    priority: 1,
                },
                common: {
                    chunks: "all",
                    test: /[\\/]src[\\/]/,
                    name: 'common',
                    minChunks: 2,
                    minSize: 0,
                    priority: 1,
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
}