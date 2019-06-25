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
        filename:'js/[name].[hash:6].js',
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
        }),
        
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name:'vendor',
                    minChunks: 1, //最小应该被引用的次数，默认就是1
                    minSize: 0,
                    priority: 1,
                },
                common:{
                    chunks: "all",
                    test: /[\\/]src[\\/]/,
                    name:'common',
                    minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
                    minSize: 0,
                    priority: 1,
                }
            }
        },
    },
}

module.exports = config
