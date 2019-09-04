const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');


const config = {
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
  optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                name: 'node_modules',
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

module.exports = config;