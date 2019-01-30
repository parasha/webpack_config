const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');


module.exports = {
    entry: {
        'index': __dirname + '/src/index/js/index.js'
    },
    output: {
        path: __dirname + '/dist', //打包后的文件存放的地方
        // filename: "js/[name].[hash:8].js", //打包后输出文件的文件名
        filename: "js/[name].js",
        publicPath: './'
    },
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        port: '8080', //默认就是8080
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0'],
                        plugins: ['transform-runtime'],
                    },
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'postcss-loader']
                })
            },
            // {　　　　　　
            //     test: /\.(png|jpg)$/,
            //     use:{
            //         loader: 'url-loader?limit=8192'　　　　
            //     }
            // },
            {
                test: /\.(png|gif|jpg|svg|jpeg)$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]',
                        outputPath: './img',
                        publicPath: '../img'
                    },
                },
            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                   
                }
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                // return getPath('js/[name].[hash:8].css').replace('js', 'css');
                return getPath('js/[name].css').replace('js', 'css');
            },
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index/index.html',
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer
                ]
            }
        }),

    ]
}