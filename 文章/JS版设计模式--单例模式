###Design Patterns -- Singleton

####写在前面
```
  "Build Better Applications With Coding and Design Patterns"

```
  感受一下JavaScript的设计模式吧。

####什么叫Singleton
  Singleton(单例)，何为单例？一个类有且仅有一个实例。

####JS中如何去实现单例
```
  我们多知道JS中是没有类这个概念,所以你要是过分的纠结单例的定义，并没有任何技术意义，这里我们只是模仿。
```

####构造函数的静态属性
```js
  function User(name) {

    if(typeof User.instance === 'object') {
      return User.instance;
    }

    this.name = 'daiqingyun';

    //静态属性
    User.instance = this;
  }

  这里要说明的是在函数中查找一个变量的步骤：
  1、先看看它是不是在函数中有var的声明
  2、函数的形参中是不是有声明
  3、是不是和函数名一样
  4、上一层作用域重复以上步骤
```

####闭包实现单例
```js
  ----------------
    闭包实现单例
  ----------------
  function User() {
    var instance = this;

    User = function() {
      return instance;
    }

    User.prototype = this;

    instance = new User();

    instance.constructor = User;

    instance.name = "dai";

    return instance;
  }
```
