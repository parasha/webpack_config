const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件


const config = {
    mode: 'production',
    entry:{
        main: './src/index.js',
        other: './src/2.js'
    },
    output:{
        filename:'js/[name].[hash:6].[id].js',
        path: path.resolve(__dirname,'./dist'),
        // publicath: "https://cdn.example.com/assets/"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                              require('postcss-import')({ root: loader.resourcePath }),
                              require('postcss-cssnext')(),
                              require('autoprefixer')(),
                              require('cssnano')()
                            ]
                          }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude : '/node_modules',
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',   
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                              require('postcss-import')({ root: loader.resourcePath }),
                              require('postcss-cssnext')(),
                              require('autoprefixer')(),
                              require('cssnano')()
                            ]
                          }
                    },
                    {
                        loader: 'less-loader',  // 
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin([
            './dist'
        ]),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css",//都提到build目录下的css目录中
        }),
        new htmlWebpackPlugin({
            title: 'webpack 测试 demo',
        })
    ]
}

module.exports = config
