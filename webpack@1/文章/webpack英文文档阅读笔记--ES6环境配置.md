###目的
  配置es6环境，同时实现js的压缩。

###安装babel
```js
  npm install --save-dev babel-core babel-preset-es2015
```

###安装babel-loader
```js
  npm install --save-dev babel-loader
```

###根目录简历配置文件.babelrc
```js
  {
    "presets": [
      "es2015"
    ]
  }
```

###文件结构
```js
  文件目录结构

  |- node_modules
  |- .babelrc
  |- index.html
  |- package.json
  |- webpack.config.js
  |- js
     |- app.js
     |- jquery.js
     |_ mtah.js



  app.js:

  import $ from './jquery.js';
  import Math from './math.js';
  let result = Math.add(2000, 16);
  $('#demo').html('hello ' + result + ' !');
```

###webpack的配置

  对于js压缩插件，之前用gulp时，还需要自己去下载相应的npm包,webpack就比较人性化了，本身就集成了JS压缩插件。

```js
  webpack.config.js:

  const webpack = require('webpack'),
        path = require('path');

  module.exports = {
    entry: {
      app: './js/app.js',
      vendor: ['./js/jquery.js', './js/math.js'] //公共的JS库
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].chunk.js'
    },
    module: {
      loaders: [
        //实现es6转码的loader配置
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      //webpack的chunks插件
      new webpack.optimize.CommonsChunkPlugin('vendor','vendor.chunk.js'),
      new webpack.optimize.UglifyJsPlugin({ //webpack自带的压缩插件
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    ]
  }
```
