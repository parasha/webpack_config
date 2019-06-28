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
 *  title：html title
    filename：输出的html文件名称
    chunks：包含的文件，可以entry和其他模块chunk的模块，插件导入到 模板时 没有排序
*/
new htmlWebpackPlugin({
    title: 'webpack 测试 demo',
    chunks: ['main','other']
})
~~~

3. mini-css-extract-plugin
css 文件单独提取(webpack 4.x)
~~~js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件

module:{
    use:[
        {
                test: /\.less$/,
                exclude : '/node_modules',
                use: [
                    MiniCssExtractPlugin.loader,
                    ...
                ]
        }
    ]
},
plugins:[
    new MiniCssExtractPlugin({
        filename: "css/[name].[hash:6].css",//都提到build目录下的css目录中
    }),
]

~~~

4. DefinePlugin
提供一些全局变量，但是数据类型很怪
~~~JavaScript
    new webpack.DefinePlugin({
        API: JSON.stringify('https://getway.qschou.com')
    }),
~~~
5. ProvidePlugin
提供全局模块
~~~JavaScript
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Axios: 'axios'
    }),
~~~