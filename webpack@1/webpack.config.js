const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
    a: './js/a.js',
    b: './js/b.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons','commons.js'),
    new ExtractTextPlugin("[name].css")
  ]
}
