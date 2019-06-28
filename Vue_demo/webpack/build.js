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
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:6].js'
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
        new webpack.DefinePlugin({
            API: JSON.stringify('https://getway.qschou.com')
        }),
        // 以全局的模式直接使用模块
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default'],
            Axios:'axios'
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin([
            '../dist'
        ], { allowExternal: true }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:6].css",//都提到build目录下的css目录中
        }),
        new htmlWebpackPlugin({
            inject: true,
            template: './index.html',
            title: 'webpack vue 测试 demo',
        }),
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
                }
            }
        },
    },
}