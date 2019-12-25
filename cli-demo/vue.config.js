const webpack_base = require('./config/webpack.base');

module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? '/static/' : '/', // 根据环境切换
  productionSourceMap: false, // 不生成 sourceMap
  configureWebpack: webpack_base
}