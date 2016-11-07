###浅拷贝与深拷贝
```js
  -------------
    浅拷贝
  -------------
  var obj = {
    name: 'name'
  }
  var a = obj;
  a.name = 'new name';
  console.log(a.name); // 'new name'
  console.log(obj.name); // 'new name'

  这里就是一个浅拷贝的例子。a只是通过赋值符号得到了obj的引用。

  ---------------
    深拷贝
  ---------------
  function object(parent, child) {
    var i,
        tostring = Object.prototype.toString,
        aStr = "[object Array]";
    child = child || {};
    for(i in parent) {
      if(parent.hasOwnProperty(i)) {
        //这时候还要判断它的值是不是对象
        if(typeof parent[i] === 'object') {
          child[i] = tostring.call(parent[i]) === aStr ? [] : {};
          object(parent[i], child[i]);
        }
        else {
          child[i] = parent[i];
        }
      }
    }
    return child;
  }
  var obj = {
    tags: ['js','css'],
    s1: {
      name: 'dai',
      age: 21
    },
    flag: true
  }
  var some = object(obj);
  some.tags = [1,2];
  console.log(some.tags); //[1, 2]
  console.log(obj.tags); //['js', 'css']  

  这里可能有一些写法，对于新手不太友好，可以看看我前面的文章（^_^）。

  上面只是对于单个对象的深拷贝，那么这里要引入多个对象拷贝的需求（mixin）:
  function mixIn() {
    var i,
        slice = Array.prototype.slice,
        args = slice.call(arguments),
        result;

    for(i = 0, max = args.length; i < max; i++) {
      result = object(args[i], result);
    }

    return result;
  }
  var a = {
    tags: [1,2,3]
  }
  var b = {
    b1: {
      name: 'no name',
      age: 21
    }
  }
  var c = mixIn(a, b);

  是不是很棒，重用了很多代码。

```

###JS中的继承模式。
  首先大家要明白原型链,[原型链简单解释](https://github.com/15751165579/ThinkInCoding/blob/master/%E6%96%87%E7%AB%A0/JavaScript%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE.md)。让你要记住prototype只能指向对象，不能指向函数。

```js
  ----------------
    method 1
  ----------------
  function inherit(Child, Parent) {
    Child.prototype = new Parent();
  }
  function Parent(name) {
    this.name = name || 'no name';
  }
  Parent.prototype.say = function () {
    console.log(this.name + ' say hi !');
  }
  function Child() {}
  inherit(Child, Parent);
  var c = new Child();
  c.say(); // 'no name say hi'

  这种方法通过原型指向父类的实例，得到继承的效果，需要注意的：
  1、对于父类构造器中的属性，我们没有办法赋予初始值。例如:
    var c = new Child('dai')
    c.say(); // 'no name say hi'
  2、这里如何找到say方法的。
    c.__proto__.__proto__ === Parent.prototype

  ------------
    method 2
  ------------
  function Father() {
    this.fMoney = 50;
    this.say = function () {
      console.log('father');
    }
  }
  function Mother() {
    this.mMoney = 2000;
  }
  function Son() {
    Father.call(this);
    Mother.call(this);
    this.hasMoney = function () {
      return this.fMoney + this.mMoney;
    }
  }
  var s = new Son();
  s.hasMoney(); // 2050
  s.say(); // "father"

  这里采用了call方法，和它拥有差不多功能的还有apply和bind。这三个函数还是很重要的。
  需要的注意的是:
  1、我们将say方法定义Father构造器中，消耗内存。


  ---------------------------
    method 3(综合上面两种方法)
  ---------------------------
  function Parent(options) {
    options = options || {};
    this.name = options.name || 'no name';
    this.age = options.age || 0;
  }

  Parent.prototype.say = function () {
    console.log(this.name + ' say hi!');
  }

  function Child(options) {
    options = options || {};
    //调用父类的构造方法
    Parent.call(this,options);
    this.job = options.job || 'no job';
  }
  //继承原型链
  Child.prototype = Object.create(Parent.prototype);
  //重新指定构造器方法
  Child.prototype.constructor = Child;

  Child.prototype.work = function () {
    console.log('work start');
  }
  var c = new Child({name: 'dai', age: 24, job: 'coder'});
  c.say(); // 'dai say hi!'
  c.work(); // 'work start'
  console.log(c.age); // 24
  console.log(c.job); // 'coder'

  这种写法还是比较好理解的，而且我也比较喜欢这样的写法。

  -------------
    模仿类
  -------------
  var jlass = function(Parent, props) {
    var Child,
        F = function () {},
        i;

    Child = function () {

      if(Child.uber && Child.uber.hasOwnProperty("__construct")) {
        Child.uber.__construct.apply(this, arguments);
      }
      if(Child.prototype.hasOwnProperty('__construct')) {
        Child.prototype.__construct.apply(this, arguments);
      }
    }

    Parent = Parent || Object;
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.uber = Parent.prototype;
    Child.prototype.constructor = Child;

    for(i in props) {
      if(props.hasOwnProperty(i)) {
        Child.prototype[i] = props[i];
      }
    }

    return Child;
  }

  var People = jlass(Object, {
    __construct: function (options) {
      options = options || {};
      this.name = options.name || 'no name';
      this.age = options.age || 0;
    },
    say: function () {
      console.log(this.name + ' ' + this.age);
    }
  })

  var Man = jlass(People, {
    __construct: function (options) {
      options = options || {};
      this.sex = options.sex || 'no';
    },
    intro: function () {
      console.log(this.name + ' ' + this.age + ' ' + this.sex);
    }
  })
  var man = new Man({name: 'dai', age: 24, sex: '男'});
  man.say(); // 'dai 24'
  man.intro(); // 'dai 24 男'

  虽然JavaScript可以模仿这样的类，但是感觉变成了另一种语言了。(*_*)

```
