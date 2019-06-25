[中文文档](https://segmentfault.com/a/1190000013476837)

~~~js
config = {
  entry:...,
  output:...,
  optimization: {
    splitChunks: {
      cacheGroups: { // 缓存组
        vendor: {
          chunks: "all", // initial、async (默认值，异步代码)和 all
          test: /[\\/]node_modules[\\/]/, // RegExp、String和Function，可以使用三种不同的匹配模式
          name:'vendor', // 分割出的代码块的命名
          minChunks: 1, // 最小应该被引用的次数，默认就是1
          minSize: 0, // 形成一个新代码块最小的体积
          priority: 1, // 优先级
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
~~~