###我们需要解决的问题
  * 在js中通过require引用css资源
  * 使用css预编译器,这里我使用的是less(less, sass, stylus你可以自行选择)
  * 告别烦人的css前缀
###实战
  准备工作，需要下载的包(建议安装cnpm)
```js
  ------------
    样式加载器
  ------------
  cnpm install --save-dev css-loader style-loader
  cnpm install --save-dev less less-loader

  ------------
    css前缀补充
  ------------
  cnpm install --save-dev postcss-loader autoprefixer

  -----------
    分离css
  -----------
  cnpm install --save-dev extract-text-webpack-plugin

  ------------
    提取html
  ------------
  cnpm install --save-dev html-webpack-plugin

```  
  准备工作完成后，看一下项目目录结构

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
  
