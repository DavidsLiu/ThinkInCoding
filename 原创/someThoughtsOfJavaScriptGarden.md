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
  2、一般我们都是用{}声明一个对象，(不要告诉我还有new Object -_-!)。而我们在添加属性的时候通常多是直接用点语法或者方括号语法添加，现在我推荐大家采用Object.defineProperty(obj,prop,descriptor)来定义。

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

#####原型 [传送门](https://github.com/15751165579/ThinkInCoding/blob/master/%E5%8E%9F%E5%88%9B/JavaScript%E4%B8%AD%E7%9A%84%E5%8E%9F%E5%9E%8B%E9%93%BE.md)

#####函数
    function bar() {}
    这种函数声明的方式，在执行前会被解析，所有在上下文的任何一个地方可以使用。

    var foo = function bar() {}
    对于这种函数赋值表达式，必须先声明再使用。
    而且在外部bar是不可见的。

#####this
