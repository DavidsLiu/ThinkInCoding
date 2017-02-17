###两种极端的加载JS模块的方式
```js
  --------------
    一个个的加载
  --------------
  优势： 仅仅需要的被加载。
  劣势： 请求数太多，请求的延迟造成了应用启动的缓慢

  ----------------------
    将所有的模块做一次请求
  ----------------------
  优势： 更少的请求数，更少的请求延迟。
  劣势： 当前可能未被用到的模块也被加载了。  
```

###webpack中的chunks
  对于一个大型应用，我们将多有的JS文件打包成一个文件，显然效率不高。特别是其中的大部分JS文件是在特定情况下才需要加载的。而webpack中的一个特点就是将所有的文件打包成一个'chunks'，达到按需加载的目的.规划按需加载的特点我们称之为代码分隔(code splitting). 再看下面几个例子首先要明白
  * 在你的项目根目录建立一个webpack.config.js(这里配置你的打包选项)
  * 在命令行中输入webpack会默认执行webpack.config.js文件

```js
  ------------
    单个入口
  ------------  

  app.js
  const a = require('./js/a.js');
  a.say();
  //这里的ensure函数的第一个参数 依赖项只会被下载下来并不会被执行。
  require.ensure(['./js/b.js'], function (require) {
    const b = require('./js/b.js');
    b.say();
  },'other'); // 添加一个chunkName

  webpack.config.js:
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js'
  },
  此时webpack会生成bundle.js和1.bundle.js两个文件。
  而我们只需要引用bundle.js, 1.bundle.js则是按需加载。
```
  打包的过程
  <center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_2.png)</center>

  html加载的过程
  <center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_1.png)</center>

```js
  -----------
    多个入口
  -----------
  a.js:
  const $ = require('./jquery.js');
  $('#demo').css('color','red');
  require(['./share.js'], function (share) {
    share('page one');
  });

  b.js:
  const $ = require('./jquery.js');
  $('#demo').css('color','yellow');
  require.ensure(['./share.js'], function (require) {
    const share = require('./share.js');
    share('page two');
  });

  这里jquery.js和share.js是两个入口文件共同使用的。

  webpack.config.js:
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
```

  打包过程
<center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_3.png)</center>

  页面A加载过程
<center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_4.png)</center>

  页面B加载过程
<center>![images](http://o8sux93eg.bkt.clouddn.com/webpack1_2_5.png)</center>  
