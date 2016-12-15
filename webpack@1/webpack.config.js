var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    pageA: './js/a.js',
    pageB: './js/b.js',
    vendor: ['./js/jquery.js','./js/share.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
}
