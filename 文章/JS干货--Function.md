###函数的声明方式
```
  ------------------
    1、采用new关键字
  ------------------
  var add = new Function('a, b','return a + b;');

  好像没人会这么写，各种不爽。

  -----------------
    2、函数声明
  -----------------
  function add(a, b) {
    return a + b;
  }

  -----------------
    3、函数表达式
  -----------------
  var add = function(a, b) {
    return a + b;
  }  
```

###函数声明提升(Function Hoisting)
```
  对于函数声明，函数名以及函数体会提前执行。
  而对于函数表达式，感觉本质上还是当做变量处理，先把变量声明提前，执行代码所在的位置，才会把后面的函数赋值给这个变量。

  console.log(add); //undefined
  var add = function(a, b) {
    return a + b;
  }
  console.log(add(1,2)); //3
```

###回调函数(Callback)
```
  var name = 'global name'
  var obj = {
    name: 'obj name'
  }
  function action(obj, callback) {
    //这里不要直接写callback(), 会导致后面的this指向window.
    callback.call(obj);
  }
  function getName() {
    console.log(this.name); // "obj name"
  }
  action(obj, getName);
```

###函数可以作为返回值，闭包的产生(closure)，产生私有变量。
```
  //这个step就是个简单的闭包
  function step() {
    //count作为step的私有属性。
    var count = 0;
    return function() {
      return count++;
    }
  }
  var next = step();
  console.log(next()); //1
  console.log(next()); //2
  console.log(next()); //3
```

###动态定义函数
```
  利用动态定义函数的性质，我们可以定义一个只执行一次的函数。
  function once() {
    console.log('one');
    once = function() {
      console.log('two');
    }
  }
  once(); // 'one'
  once(); // 'two'
  once(); // 'two'

  看似这个函数满足我们的需求,但是它在原型链上有很大的问题，后面会应该会讲到这个问题。
```

###立即执行函数(IIFE)
```
  这个应用的很广泛，很多第三库多是采用这种方式包裹自己的核心代码。可以去看看JQuery的源码。
  立即执行函数的写法很多，我推荐还是用这种：(function(a){})(a);
  常见的解决问题：(举一个栗子)

  var i,
      max;
  for(i = 0,max = 5; i < max; i++) {
    setTimeout(function() {
      console.log(i);
    },300);
  }
  这里会输出5个5，显然这不是我们的需求：

  var i,
      max;
  for(i = 0,max = 5; i < max; i++) {
    (function(i) {
      setTimeout(function() {
        console.log(i);
      },300);
    })(i);
  }

  这样才会输出0，1，2，3，4。
```

###函数记忆功能
```
  var memery = function(a....) {
    //得到唯一的标识
    var hashkey = JSON.stringify(Array.prototype.slice.call(arguments));

    //保存在hash表中。
    if(!memery.cache[hashkey]) {
      var result = 'cache function';
      memery.cache[hashkey] = result;
    }
    return memery.cache[hashkey];
  }

  其实这里涉及到了函数式编程的相关知识，怎么才能使用上函数的记忆功能呢？
  那么得要求开发者编写的函数为纯函数，这里的纯函数可能对函数式编程不了解的小伙伴一脸懵逼。
  不要紧，大家自行百度或者Google。（^_^）.
```
###柯里化(Currying)
```
  科里化也是函数式编程中的概念。（哎，学个前端什么多得了解了解，宝宝系里苦呀。）
  很经典的一道面试题：sum(1)(2)(3)(4) 输出10

  function sum(x) {
    var result = x,
        temp = function(y) {
          result += y;
          return temp;
        };
    //因为temp是个函数，我需要在计算和log的时候将它转化为数字或者字符串。
    //toString和valueOf分别字符串输出和计算时会调用的方法。
    temp.toString = temp.valueOf = function() {
      return result;
    }
    return temp;
  }
  console.log(+sum(1)(2)(3)(4)); //10

  是不是很神奇，推荐大家两个库学习学习，一个是Underscore.js，另一个是Ramda.js。
  大家可以下载它们的源码看看，写的很精髓。
  对于Currying，Underscore中是 _.partial
  对于Ramda.js中，比较特殊，它是用一个curry的函数包裹其它的函数，有兴趣的小伙伴可以自己研究研究。
```
