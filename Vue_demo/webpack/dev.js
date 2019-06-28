const path = require('path')

const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        https: true,
        host: 'localhost',  // 访问地址
        port: '8001',  // 访问端口
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
                    query: {
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
        // 提供一些全局变量，但是格式有点怪
        new webpack.DefinePlugin({
            API: JSON.stringify('')
        }),
        // 以全局的模式直接使用模块
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default'],
            Axios:'axios'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",//都提到build目录下的css目录中
        }),
        new htmlWebpackPlugin({
            inject: true,
            template: './index.html',
            title: 'webpack vue 测试 demo',
        }),
        new webpack.HotModuleReplacementPlugin() //热更新
    ]
}