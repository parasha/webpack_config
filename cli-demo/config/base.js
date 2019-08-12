const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:6].js'
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
  plugins: [
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Axios: 'axios'
    }),
    new htmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
      title: 'webpack vue-cli@3.0 测试 demo',
    }),
    new webpack.DefinePlugin({
      API: process.env.NODE_ENV == 'production' ? JSON.stringify('https://getway.qschou.com') : JSON.stringify('')
  }),
  ]
};