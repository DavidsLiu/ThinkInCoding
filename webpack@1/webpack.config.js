const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      Autoprefixer = require('autoprefixer'),
      HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './js/app.js' //入口
  },
  output: {
    path: path.join(__dirname, 'dist/'), //输出的路径
    filename: 'js/[name].[hash:8].js' //文件名称
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader!postcss-loader') //从js中分离出css
      }
    ]
  },
  postcss: function () {
    return [Autoprefixer]; //配置css前缀补全
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[hash:8].css"),//提取出css的文件名称
    new HtmlPlugin({
      template: './index.html' //html文件路径
    })
  ]
}
