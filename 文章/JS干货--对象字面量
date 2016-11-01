###Why?
```js
  一把在JS中声明对象，大家多会这么写var a = {};
  很少有人这么写：var a = new Object();
  这是为什么呢?
  1、首先{}这叫做对象字面量，new Object()则是使用构造器函数。
  2、明显的对象字面量的声明方式比构造器函数更加方便。
  3、new关键字缺失造成的问题。

  所以在JS中建议以对象字面量的声明方式优先。下面我们先说说构造器函数
```

###构造器函数
```js
  ----------------
    constructor
  ----------------
  举个栗子：
  var Student = function() {
    this.name = 'default';
    this.say = function() {
      console.log('say hello!');
    }
  }
  这里的say方法放在构造函数的内部是不妥的。对于可以重用的成员，建议放在原型链上，主要是因为它一直保存在内存中。
  所以可以改为：
  Student.prototype.say = function() {
    console.log('say hello!');
  }

  如果我们创建实例的时候，丢失new呢？
  var s1 = Student();
  console.log(window.name); //"default"

  缺少new关键字之后，对于Student内部的this便指向了全局对象。这是很糟糕的一件事。
  这也是为什么规定构造函数的首字符大写的原因。

```

###去new
```js
  ---------------
    去掉new关键字
  ---------------
  function People() {
    if(!(this instanceof People)) {
      return new People();
    }

    this.name = "default";
  }

  我们还可以通过arguments.callee完成同样的效果，不过在ES5的"use strict"模式下被禁用了。

```

###其他的字面量
```js
  数组字面量
  var arr = [1,2,3];

  正则表达式字面量
  var reg = /[a-z]/g;

```
