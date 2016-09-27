###some thoughts of JavaScript Garden

  点击这里传送到[JavaScript-Garden](http://bonsaiden.github.io/JavaScript-Garden/zh/)。
  本文主要是我在阅读中的一些思考的总结。

#####JavaScript所有的变量都可以当做对象使用，例外：null和undefined。
  首先我们要注意Number在使用点语法的时候，注意小数点造成的错误，安全的写法：
```js
    1..toString();
    1 .toString();
    (1).toString();
```
  第二我要谈谈我对于null和undefined不能作为对象使用的理解，首先不能作为对象使用，也就是不能使用Object的方法。从原型链的角度我们知道:
    Object.prototype.__proto__ === null
  一目了然，null当然不能作为对象使用。而对于undefined,我个人认为undefined应该是不在JavaScript原型链中的。

#####对象的理解
  1、点语法与方括号语法的使用，两个基本相同，但是对于key为变量的时候，只能用方括号语法。
  2、一般我们都是用{}声明一个对象，(不要告诉我还有new Object() -_-!)。而我们在添加属性的时候通常多是直接用点语法或者方括号语法添加，现在我推荐大家采用Object.defineProperty(obj,prop,descriptor)来定义。

```js
    /*
        Object.defineProperty(obj,props, descriptor)
        descriptor {
            configurable: false, //是否可以修改这个属性的配置
            enumerable: false, //是否可以遍历
            writable: false, //是否可以修改
            value: null, //值
            set: undefined, //赋值
            get: undefined //读取
        }
    }
    */
    var people = {};
    Object.defineProperty(people,'name',{
        enumerable: true,
        configurable: true,
        writable: false,
        value: 'daiqingyun'
    });
```    
  而现在比较火热的MVVM框架中的双向绑定正是用到了这个方法，[Vue双向数据绑定的原理](https://segmentfault.com/a/1190000006599500)

  删除对象的属性主要用的delete方法

#####原型链 [传送门](https://github.com/15751165579/ThinkInCoding/blob/master/%E5%8E%9F%E5%88%9B/JavaScript%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE.md)

#####函数
    function bar() {}
    这种函数声明的方式，在执行前会被解析，所有在上下文的任何一个地方可以使用。

    var foo = function bar() {}
    对于这种函数赋值表达式，必须先声明再使用。
    而且在外部bar是不可见的。

#####this
  其实对于this我的理解是，谁调用它，它就指向谁。
  比较特殊的是，new 的构造函数，会将this指向新构造的对象。
  更改this的方法：apply(thisArg,[argsArray]), call(thisArg,arg1,arg2...), bind(thisArg,arg1,arg2...)
```js
    //apply和call的区别主要在于传入的参数形式不一样。
    //bind的实现方法
    if(!function(){}.bind) {
        Function.prototype.bind = function(context){
           var self = this;
           var args = Array.prototype.slice.call(arguments,1);
           return function(){
               return self.apply(context, args);
           }
        }
    }
```  

#####闭包
  简单的闭包形式
```js
    function some(start) {
        //变量li为私有变量，只能通过add和get这两个闭包访问。
        var li = start;
        return {
            add: function() {
                li++;
            },
            get: function() {
                return li;
            }
        }
    }
```

#####arguments对象
    1、arguments是类数组对象。
    2、转化为数组：[].slice.call(arguments);
    3、arguments与形参是双向绑定的，因为arguments内部创建了getter和setter方法。
    4、不要使用arguments.callee以及它的属性。

#####作用域
    1、es5只支持函数作用域，没有块级作用域。
    2、JavaScript没有显示的命名空间，更糟糕的是声明一个全局变量就变成了全局对象的属性。
    3、千万不要有隐式全局变量的写法。（不加var 就使用一个变量）
    4、变量声明提示。
    5、访问函数内foo变量的步骤: 当前作用域内是否有var foo的定义 --》 函数的形参是否用了foo ---> 函数的本身叫不叫foo ---> 重复
    6、命名空间，可以采用IIFE(立即执行函数) (function(){}())、(function(){})()、+function(){}()。
    7、（后面我会专门总结一下作用域链） ^-^

#####类型
    1、强烈建议放弃==，使用===。       
    2、对于基本类型采用=时多是深复制，而对于数组和对象则是浅复制。以下为实现方式：
```js
    function copy(data) {
        var type = Object.prototype.toString.call(data);
        if(type === '[object Array]') {
            var temp = [];
            var length = data.length;
            for(var i = 0; i < length; i++) {
                temp.push(data[i]);
            }
            return temp;
        }
        else if(type === '[object Object]') {
            var temp = {};
            for (var p in data) {
                if (data.hasOwnProperty(p)) {
                    temp[p] = data.p;
                }
            }
            return temp;
        }
        else {
            return data;
        }
    }
```  
    3、typeof操作符往往得不到我们预期的结果，它在大部分的时间里多返回object。
    4、instanceof操作符来比较两个构造函数，只有比较自定义对象时才有意义，比较内置对象将和typeof一样毫无用处。
    5、精确的获得对象的类型，采用 Object.prototype.toString.call(); --> '[object ****]'
    6、转化为字符串: '' + 10
    7、转化为数字: + '10'
    8、转化为布尔: !!'foo'
