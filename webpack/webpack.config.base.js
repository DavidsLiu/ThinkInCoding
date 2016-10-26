var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
    debug: true,
    entry: './src/views/main.js',
    output: {
        filename: "[name].js",
        path: __dirname + '/dist',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /.jsx?$/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    cacheDirectory: true
                },
                exclude: /node_modules/
            }

        ]
    },
    plugins: []
}
