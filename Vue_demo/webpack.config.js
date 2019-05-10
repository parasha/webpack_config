const path = require('path')

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/index.[hash:6].js'
    },
    devServer: {
        host: 'localhost',  // 访问地址
        port: '8001',  // 访问端口
        open: true, // 自动拉起浏览器
        hot: true // 热加载
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query:{
                        presets: ['env'],
                        cacheDirectory: true,
                        plugins: [
                            ["transform-runtime", {
                                polyfill: false,
                                regenerator: true
                            }]
                        ]
                    }                    
                }
            },
            {
                test: /\.less$/,
                exclude: '/node_modules',
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
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',  // 
                        options: {
                            importLoaders: 1
                        }
                    },
                ]
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
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin([
            './dist'
        ]),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css",//都提到build目录下的css目录中
        }),
        new htmlWebpackPlugin({
            inject: true,
            template: './index.html',
            title: 'webpack vue 测试 demo',
        }),
        new webpack.HotModuleReplacementPlugin() //热更新
    ]
}