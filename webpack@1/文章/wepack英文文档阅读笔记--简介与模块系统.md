###优势

#####插件(Plugins)
```
  webpack中有丰富的插件，你可以找到你需要的插件，并且它又是那么的易用。
```

#####表现(Performance)
  webpack采用异步IO和多个缓存层次使得增量编译的速度快的让人难以置信。

#####加载器(Loaders)
  对于加载器带给我们太多的便利，举几个栗子吧：
  * 为我们的CSS添加前缀。
  * 将小于8KB的图片base64
  * 使用less预处理器
  * 等等。。

#####支持(Support)
  webpack支持AMD和CommonJS规范，支持大部分的其他库.

#####按需加载(Code Splitting)
  我们将第三方js文件放入chunks,而chunks中是按需加载的，这能大大的减少我们的加载时间。

#####优化(Optimizations)
  webpack可以优化我们输出的JS文件的大小，同时也可以通过hashes静态文件缓存问题。

#####调试工具(Development Tool)
  webpack支持SourceUrls和SourceMaps, 你也可以用 development server 来实现自动刷新。

#####不仅仅是web
  webpack的服务不仅仅局限于web,WebWorkers和NodeJS同样可以使用。

###webpack的出现
  现在的前端开发多强调前后端分离，所以大部分需要写的代码回归到了我们前端的手中（是不是很爽），所以我们需要组织我们的代码，需要有一个模块体系：
  * 最初的script标签
  * CommonJS规范
  * AMD规范
  * ES6 Module

#####script
  我们一般多是使用script标签引入JS库，而这种方式带来的问题:
  * 全局变量的冲突
  * 依赖的管理
  * 对于大量文件的导入，很不适合书写。

#####CommonJS规范
  CommonJS规范主要引用于NodeJS：
  * 它的出现使得服务器上很多模块得以重用
  * npm给我们带来了巨大的便利。
  * 因为CommonJS主要用于服务器端，所以采用的是同步加载，并不适合浏览器端。

```js
  //Math.js:
  let Math = {
  	add (a, b) {
  		return a + b;
  	}
  }
  module.exports = Math;

  //b.js
  var Math = require('./math');
  let result = Math.add(1, 2);
  console.log(result); // 3
```    

#####AMD规范
  于是推出了一个异步加载的模块规范AMD.实现AMD主流的库require.js.
```html
  <h2 id="demo">首页</h2>
  <script src="http://cdn.bootcss.com/require.js/2.3.2/require.min.js" data-main="js/main"></script>
```
```js
  //js文件夹下的math.js
  define(function () {
  	var math = {};
  	math.add = function (a, b) {
  		return a + b;
  	}
  	return math;
  });
```
```js
  //js文件夹下的main.js
  require.config({
  	paths: {
  		jquery: 'http://cdn.bootcss.com/jquery/3.1.1/jquery.min', //不能加js后缀名。
  		math: 'math'
  	}
  });

  require(['jquery','math'], function ($, math) {
  	var result = math.add(10, 2006);
  	$('#demo').html('hello ' + result + ' !');
  });
```

#####ES6 Module(ES6中的模块)
  这个感觉跟CommonJS有点像，与CommonJS不同的是，它只是获取模块的引用，到真正使用的时候才会去取值。
```js
  例如student.js中:
  let student = [
    {
      name: 'xiaoming',
      age: 21,
    },
    {
      name: 'xiaohong',
      age: 18
    }
  ]
  export default student; // 这种导出方式，你可以在import时指定它的名称。  

  在app.js中我们就可以这样用:
  import StudentList from './student.js'; //指定名称
  console.log(StudentList[0].name); //xiaoming
```  
