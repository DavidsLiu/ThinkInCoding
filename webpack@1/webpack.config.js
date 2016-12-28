const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      Autoprefixer = require('autoprefixer'),
      HtmlPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader!postcss-loader')
      },
      {
        //处理在css设置background-image和在js中设置backgroundImage的情况
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        /**
         * 这里可以设置两个参数
         * （1）limit设置图片base64处理的大小，比如这里是图片小于8KB时，做base64,有效的减少一次请求
         * （2）name设置图片的路径
         */
      },
      {
        //处理img标签中通过src引用图片你的情况
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  postcss: function () {
    return [Autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HtmlPlugin({
      template: './index.html'
    })
  ]
}
