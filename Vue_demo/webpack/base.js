const path = require('path')

const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    main: './src/index.js',

  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:6].js'
  },
  resolve: { // 解析 TS
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }
        ]
      },
      { 
        test: /\.tsx?$/, // 解析 TS
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-runtime", {
                regenerator: true
              }],
              ["@babel/plugin-syntax-dynamic-import"],
            ]
          },
        }
      },
      {
        test: /\.less$/,
        exclude: '/node_modules',
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
                require('cssnano')()
              ]
            }
          },
          {
            loader: 'less-loader',  // 
            options: {
              importLoaders: 1
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[hash:6].[ext]',
              context: 'src/'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // 以全局的模式直接使用模块
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Axios: 'axios'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",//都提到build目录下的css目录中
    }),
    new htmlWebpackPlugin({
      inject: true,
      template: './index.html',
      title: 'webpack vue 测试 demo',
    }),
  ],
}