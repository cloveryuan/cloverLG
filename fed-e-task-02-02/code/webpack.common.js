var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')// 分包css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')// 压缩css
const TerserWebpackPlugin = require('terser-webpack-plugin')// 内置的压缩js

module.exports = {
  entry: {
    // 编译文件入口
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出的目录，__dirname是相对于webpack.config.js配置文件的绝对路径
    // publicPath: "./", // 通过devServer访问路径
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'assets'
        }
      },
      // {
      //   test: /\.(jpg|png|jpeg|gif|svg|ico)$/,
      //   loader: "file-loader",
      //   options: {
      //     esModule: false,
      //     name: "[name].[ext]",
      //     // publicPath: "./assets/",
      //     outputPath: "assets",
      //   },
      // },
      // {
      //   // 处理html中img资源
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // exclude表示忽略node_modules文件夹下的文件，不用转码
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].bundle.css'
    }),
    new HtmlWebpackPlugin({
      title: 'part2-2',
      favicon: './public/favicon.ico',
      filename: 'index.html',
      template: './public/index.html'
    })
  ]
}
