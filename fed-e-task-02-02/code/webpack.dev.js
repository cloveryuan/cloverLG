const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/, // exclude表示忽略node_modules文件夹下的文件，不用转码
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    alias: {
      // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      '@': path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components')
    }
  },
  devServer: {
    open: true, // 开启服务器后是否自动打开浏览器
    port: 8080, // 服务器所占端口
    contentBase: path.resolve(__dirname, 'dist'), // 服务器打开本地文件的地址
    // hot: true,
    historyApiFallback: true // 找不到页面默认跳index.html
  }
})
