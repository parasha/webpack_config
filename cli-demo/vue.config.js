const webpack_base = require('./config/webpack.base');

module.exports = {
  publicPath: '',
  productionSourceMap: false, // 不生成 sourceMap
  configureWebpack: webpack_base
}