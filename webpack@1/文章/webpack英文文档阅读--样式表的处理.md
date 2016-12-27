###我们需要解决的问题
  * 在js中通过require引用css资源
  * 使用css预编译器,这里我使用的是less(less, sass, stylus你可以自行选择)
  * 告别烦人的css前缀
###准备工作
  通过require()引用css文件需要的包：
```js
  cnpm install --save-dev style-loader css-loader
```  
  使用less预编译器需要的包：
```js
  cnpm install --save-dev less less-loader
```  
  自动添加css前缀需要的包：
```js
  cnpm install --save-dev postcss-loader autoprefixer
```  
  从JS中分离css到单独文件需要的包:
```js
  cnpm install --save-dev extract-text-webpack-plugin
```  
  将webpack生成的文件映射到html上需要的包：
```js
  cnpm install --save-dev html-webpack-plugin
```  
  准备工作完成后，看一下项目目录结构:
```js
  |- css
  |  |_ base.less
  |
  |- js
  |  |_ app.js
  |
  |- index.html
  |- package.json //配置文件
  |- webpack.config.js //webpack配置文件
  |_ node_modules //npm包存放目录
```
  base.less文件：
```less
  @themeColor: red;

  .title {
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: @themeColor;
    border: 1px solid transparent;
    transition: all 1s ease-in-out;
    cursor: pointer;
    &:hover {
      border-color: rgb(23,223,123);
    }
  }
```
  app.js文件:
```js
  require('../css/base.less');
```  
  index.html(这里主要针对的单页面的情况，多页面后面会出,敬请期待):
```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index</title>
  </head>
  <body>
    <h2 class="title">我为程序员代言。</h2>
  </body>
  </html>
```
  主要的webpack.config.js的配置:
```js
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
```
  楼主之前使用了一段时间的gulp,感觉还是webpack比较好一点（无理由安利-.-）,[github](https://github.com/15751165579)
