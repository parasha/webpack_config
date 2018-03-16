var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('./path')

module.exports = {
    entry: __dirname + '/public/index.js',
    output:{
        path:__dirname + '/dist',
        filename:'main.js'
    },
    devtool: 'eval-source-map',
    devServer:{
        contentBase:'./dist',
        port:'8080',
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module:{
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ["env"]
                }
              }
            }
          ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpackTest'
        }),
    ]
}