const webpack = require('webpack'),
      path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    vendor: ['./js/jquery.js', './js/math.js']
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
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.chunk.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
