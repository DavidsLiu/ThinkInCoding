###JavaScript中的new
  其实本事new关键字并不应该是JavaScript中的特色，主要是因为Java太火了，想抱一下它的大腿。

####JavaScript中的new的重要缺陷
  首先我们看下面一段代码:
  ```js
  //全局变量
  var name = "global people";
  function People(name) {
    this.name = name;
    return this;
  }
  var xiaoming = new People('xiaoming');
  console.log(xiaoming.name); //xiaoming
  console.log(name); //global people
  ```
  通常情况下我们会这样写，但是如果有一天，你突然写成了下面这种形式？
  ```js
  //全局变量
  var name = "global people";
  function People(name) {
    this.name = name;
    return this;
  }
  var xiaoming = People('xiaoming'); //小手一滑new忘记写了（这也是为什么构造器函数的首字母多大写的原因）
  console.log(xiaoming.name); //xiaoming
  console.log(name); //xiaoming
  ```
  这是多么糟糕的一件事，在《JavaScript语言精髓》中，道格拉斯也认为要避免使用new关键字:
    If you forget to include the new prefix when calling a constructor function, then this will not be bound to the new object. Sadly, this will be bound to the global object, so instead of augmenting your new object, you will be clobbering global variables. That is really bad. There is no compile warning, and there is no runtime warning.

  其实我们从上面的例子也可以看出，new的作用主要将this绑定到新的实例对象上，同时__proto__指向构造函数的prototype.

####es5中提供了Object.create(proto, [options])的方法
  1、举个栗子---创建对象的实例：
  ```js
  var name = "global";
  function Student(name, age) {
    this.name = name;
    this.age = age;
  }
  Student.prototype.say = function() {
    console.log(this.name + ' ' + this.age);
  }
  var xiaoming = Object.create(Student.prototype,{
    name: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 'xiaoming'
    },
    age: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 24
    }
  });
  xiaoming.name = "newxiaoming";
  console.log(xiaoming.name); //newxiaoming
  xiaoming.say(); //newxiaoming 24
  console.log(name); //global
  ```
  2、举个栗子---继承：
  ```js
  function People(options) {
    this.name = options.name;
  }
  People.prototype.say = function() {
    console.log(this.name);
  }
  function Student(options){
    //继承构造器属性
    People.call(this,options);
    this.job = options.job;
  }
  //继承原型链
  Student.prototype = Object.create(People.prototype);
  Student.prototype.constructor = Student;

  Student.prototype.sayjob = function(){
    console.log(this.job);
  }
  var xiaoming = Object.create(Student.prototype,{
    name: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 'xiaoming'
    },
    job: {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 'student'
    }
  });
  xiaoming.say(); //xiaoming
  xiaoming.sayjob(); //student
  console.log(xiaoming instanceof Student); //true
  console.log(xiaoming instanceof People); //true
  ```

####JQuery中如何消除new。
  通过[张鑫旭大神的文章](http://www.zhangxinxu.com/wordpress/2013/07/jquery-%E5%8E%9F%E7%90%86-%E6%9C%BA%E5%88%B6/)，让我对jQuery的理解更进一步，下面是一个简单的jQuery的实现：
  ```js
  (function(window, undefined){
    var jQuery = function(selector, context) {
      //返回一个__proto__指向jQuery.fn.init.prototype的实例。
      return new jQuery.fn.init(selector,context);
    }
    //隐藏prototype
    jQuery.fn = jQuery.prototype = {
      init: function(selector, context){
        var nodeList = document.querySelectorAll(selector);
        this.length = nodeList.length;
        for(var i = 0; i < this.length; i++){
          this[i] = nodeList[i];
        }
        //返回this主要用于链式调用
        return this;
      },
      //遍历器
      each: function(fn){
        var length = this.length;
        for(var i = 0; i < length; i++){
          fn.call(this[i],i,this[i]);
        }
        return this;
      }
    }
    //将实例的__proto__指向jQuery.prototype
    jQuery.fn.init.prototype = jQuery.prototype;

    window.$ = jQuery;

  })(window);
  console.log($('div'));
  ```
