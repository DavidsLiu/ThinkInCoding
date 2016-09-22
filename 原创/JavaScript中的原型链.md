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
```
    这是JavaScript中的一个简单的继承，本文就针对这个例子来讨论JavaScript的原型链，话不多，上图（自己画了一个，不是特别美观。。）
    <center>
    ![原型链图片](http://o8sux93eg.bkt.clouddn.com/JavaScript%E5%8E%9F%E5%9E%8B%E9%93%BE.pdf "这是原型链图片")
    </center>
