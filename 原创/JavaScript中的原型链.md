###JavaScript中的原型链

------------------------------------
    写在前面：这边文章主要是弄清JavaScript原型链中的一些概念，（虽然我是个小白-_-!）。可能会有一些错误，还望大家批评指正。

#####示例代码
```js
    function People(options) {
        this.name = options.name;
        this.age = options.age;
        this.sex = options.sex;
    }
    People.prototype.say = function() {
        console.log('my name is ' + this.name);
    }

    function Student(options) {
        People.call(this,options);
        this.math = options.math;
    }
    Student.prototype = Object.create(People.prototype);
    Student.prototype.constructor = Student;
    var xiaoming = new Student({
        name: 'xiaoming',
        age: 21,
        sex: 'man',
        math: 'A'
    });
```
    这是JavaScript中的一个简单的继承，本文就针对这个例子来讨论JavaScript的原型链，话不多，上图（自己画了一个，不是特别美观。。）
<center>![image](http://o8sux93eg.bkt.clouddn.com/prototype.png)</center>


#####问题一
    为什么人们多说JavaScript中万物皆是对象，由图可知，沿着他们的原型链，最终多会到达Object.prototype。

#####问题二
    对象都有prototype和__proto__属性，而对象的实例只有__proto__属性。

#####问题三
    constructor(构造器属性)，对于这个我的理解是，它相当于一种循环引用，例如Function.prototype.constructor = Function;

#####问题四
    __proto__多指向其构造器的prototype: xiaoming.__proto === Student.prototype。

#####问题五
    为什么我们在使用for in 的时候，总是要强调要使用Object.hasOwnProperty(str)呢，因为在forin中，会沿着原型链查找，就比如上面xiaoming的
    例子，如果我们不使用Object.hasOwnProperty(str),遍历出来的结果会包含：constructor say 。 为了安全起见，在使用forin时还是最好使
    用Object.hasOwnProperty(str).
