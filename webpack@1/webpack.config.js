var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    vendor: ['./js/jquery.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.chunk.js')
  ]
}
