###在JS中引用css文件
  一般情况下，我们多是通过link标签来引用外部样式表的。今天我们可以在JS文件中通过require()的方式引用外部样式表。

###使用步骤
```js
  1、首先安装style-loader和css-loader
  npm install --save-dev style-loader css-loader

  2、app.js中通过require()引用样式表
  require('../css/action.css');

  3、webpack.config.js的配置
  const webpack = require('webpack'),
        path = require('path');
  module.exports = {
    entry: {
      app: './js/app.js'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].chunk.js'
    },
    module: {
      loaders: [
        {
          //css-loader和style-loader的配置。
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    }
  }
```

###插件的配合使用，效果更好。
  如果你去查看webpack打包后的文件，你会发现css被加入到了app.chunk.js文件中了。这时我们可以通过extract-text-webpack-plugin插件将css抽离出来。

###使用步骤
```js
  1、安装extract-text-webpack-plugin插件
  npm install --save-dev extract-text-webpack-plugin

  2、webpack.config.js:
  const webpack = require('webpack'),
        path = require('path'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');
  module.exports = {
    entry: {
      app: './js/app.js'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].chunk.js'
    },
    module: {
      loaders: [  
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader") //这里发生了改变
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css")
    ]
  }

  注意： 对于output中的filename最好加上[name],对于多个入口文件的场景，如果你不写的话，发生覆盖。得不到预期的结果。
```  

  这里同样可以结合CommonsChunkPlugin插件，将公共的css样式表抽离出来。

```js
  1、我们有一个base.css存放一些基础的样式.

  2、在a.js和b.js中多引用了base.css

  3、webpack.config.js配置
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
```  
  打包生成的文件
  <center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_6.png)</center>
