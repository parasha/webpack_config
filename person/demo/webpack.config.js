const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry:{
        main: './src/index.js',
        other: './src/2.js'
    },
    output:{
        filename:'[name].[hash].[id].js',
        path: path.resolve(__dirname,'./dist'),
        publicPath: "https://cdn.example.com/assets/"
    },
    plugins:[
        new CleanWebpackPlugin([
            './dist'
        ]),
        new htmlWebpackPlugin({
            title: 'webpack 测试 demo',
        })
    ]
}

module.exports = config
