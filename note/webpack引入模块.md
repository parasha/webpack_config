### webpack 打包之后的 import

> 不一定对

1. 静态引入

    在编译之后，webpack 会生成 两个对象： webpack_export 和 webpack_require , 负责模块的导入导出。\
    每一个独立打包的 js 文件都通过这两个对象进行关联。\

2. 动态引入

    通过 import('./..') 方式动态引入的文件，webpack 会生成一个 jsonp 方法动态插入 一个新的 script 文件，然后再通过 webpack_export 和 webpack_require 进行操作