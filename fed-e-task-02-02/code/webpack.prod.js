const merge = require('webpack-merge')
const common = require('./webpack.common')
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash:8].bundle.js'
  },
  plugins: [
    // new UglifyJSPlugin(), // 这款插件用于压缩 JS 代码，减少资源体积大小
  ]
})
