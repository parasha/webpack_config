### plugins
插件都配置在 plugins 数组中。

功能很杂，基本什么都能做。

传入的都是 new 插件实例。

#### 常用插件

1. clean-webpack-plugin
清理旧版本打包文件
~~~js
const CleanWebpackPlugin = require('clean-webpack-plugin')

new CleanWebpackPlugin([
    './dist'
]),
~~~

2. html-webpack-plugin
自动生成一个引用了打包 js 的 html 文件
~~~js
const htmlWebpackPlugin = require('html-webpack-plugin');

/** 
 *  title：模板title
    filename：输出的html文件名称
    chunks：包含的文件，可以entry和其他模块chunk的模块，插件导入到 模板时 没有排序
*/
new htmlWebpackPlugin({
    title: 'webpack 测试 demo',
    chunks: ['main','other']
})
~~~