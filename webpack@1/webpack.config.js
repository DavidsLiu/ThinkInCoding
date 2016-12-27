const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      Autoprefixer = require('autoprefixer'),
      HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './js/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader!postcss-loader')
      }
    ]
  },
  postcss: function () {
    return [Autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[hash:8].css"),
    new HtmlPlugin({
      template: './index.html'
    })
  ]
}
