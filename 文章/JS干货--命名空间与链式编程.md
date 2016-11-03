###命名空间(namespace)
```js
  相信会Java的同学，对于命名空间并不会陌生。
  我们来看看JavaScript中如何实现命名空间：
  简单的的实现:
  var MYAPP = {};//显然这样不是很优雅（^_^）

  换成这样:
  if(typeof MYAPP === "undefined") {
    var MYAPP = {};
  }

  or:
  var MYAPP = MYAPP || {};

  现在我们是不是要用个方法来扩展我们的命名空间了:
  var MYAPP = MYAPP || {};
  MYAPP.namespace = function(str) {
    var arr = str.split('.'),
        i,
        max,
        parent = MYAPP,
        temp;
    if(arr[0] === "MYAPP") {
      arr = arr.slice(1);
    }
    for(i = 0,max = arr.length; i < max; i++) {
      if(typeof parent[arr[i]] === "undefined") {
        parent[arr[i]] = {};
        parent = parent[arr[i]];
      }
    }
  }
  MYAPP.namespace('base.utils');
  MYAPP.namespace('com.goodsInfo')

  但是我去查了一下JQuery、Underscore的源码，它们并不是这样处理的(原理是一样的)。
  underscore.js:
  (function(){
    this._ = function() {
      console.log("underscore");
    }
  }.call(this));

  这是underscore里面的命名空间，知道call方法，应该多能看懂吧。
  但是这里有个小问题，这也是你为啥会看到很多下面这种写法:
  !(function(){}.call(this));
  +(function(){}.call(this));

  如何你在引入Underscore之前的代码的最后没有加上; 会导致编译出错。
  所以让你看不懂的这些特殊符号起到这个作用。

  有兴趣的可以看看jquery的实现方法。
```

###链式编程
```js
  经常用JQuery的同学，应该对链式编程很熟悉，那种酸爽。。。
  其实它的原理很简单，就很在它的方法结束的时候返回自己的指向，也就是this。
  举个栗子:

  if(typeof Function.prototype.method === 'undefined') {
    Function.prototype.method = function(name, fn) {
      this.prototype[name] = fn;
      return this;
    }
  }
  var People = function (options) {
    options = options || {};
    this.name = options.name || 'default';
  }.
    method('getName', function() {
      return this.name;
    }).
    method('setName', function(name) {
      this.name = name;
      return this;
    });
  var p1 = new People();
  p1.setName('dai').getName() // 'dai'

  这是一个简单的链式调用，如果你想深究的话，可以研究研究JQuery中的链式调用。
```
