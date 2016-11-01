###JS中的全局变量
```js
  ----------------
    隐式声明全局变量
  ----------------
  在JavaScript中全局变量会变成全局对象(浏览器中为window)的属性
  一下两种方式会隐式的成为全局变量:
  1、no var
  function add(a, b) {
    //result变成全局变量
    result = a + b;
    return result;
  }

  2、chain assignments
  function add() {
    //b变成了全局变量
    var a = b = 2;
  }

  ------------
    规范的声明
  ------------
  对于单个变量的声明没有什么要说的，对于多个变量的声明：
  function add() {
    var a = 1,
        b = 2,
        c = 3;
  }

```

###变量声明提升
```js
  -------------
    Hoisting
  -------------
  Hoisting(变量声明提升)，实际上我们会经常遇到这样的问题：

  var name = "globalname";
  function some() {
    console.log(name); //undefined
    var name = "localname";
    console.log(name); //localname
  }

  1、我之前的文章写过，JS是有函数作用域的。
  2、所以这里两个console中的name要首先搜索some这个作用域中的name.
  3、在some函数中，var name = "localname"被拆成了var name;和name = "localname";
  4、而var name;被放置到了some这个作用域的顶部。
```

###forin的使用
```js
  -------------
    forin
  -------------
  对于forin，我们首先看下面的例子：
  var student = {
    name: 'dai'
  }
  Object.prototype.age = 21;
  for(var i in student) {
    console.log(i + ' ' + student[i]);
    //name dai
    //age 21
  };

  这里实际上把原型链上的也枚举出来，而实际上我们只需要name这个属性,所以：
  for(var i in student) {
    if(student.hasOwnProperty(i)) {
      console.log(i + ' ' + student[i]);
    }
  }
  通过hasOwnProperty可以过滤掉原型链上的属性。
  但是万一student中有一个属性就叫hasOwnProperty呢？
  这里我们推荐保险的写法
  for(var i in student) {
    if(Object.prototype.hasOwnProperty.call(student,i)) {
      console.log(i + ' ' + student[i]);
    }
  }

  这里大家一定会想到，我要是Object.prototype.hasOwnProperty也被修改呢?

  ------------------------
    build-in-prototype
  ------------------------
  通常我们是不建议修改顶部原型链的，如果要修改必须得和自己团队里的人协商好，有良好的文档。
  基本写法：
  if(typeof Object.prototype.methodName !== "function") {
    Object.prototype.methodName = function() {
      //do something
    }
  }
```

###拒绝使用==
```js
  使用=== 代替 == 。
```

###避免使用eval()
```js
  坏处远大于好处，所以舍弃吧。
```

###字符串转化为数字
```js
  -----------------
    字符串转成数字
  -----------------
  一般我多会使用parseInt()这个方法，但是大部分人多会舍弃第二个参数，这里可能会出现问题，建议加上。
  我们还可以通过加号快速将字符串转化为数字。
  两者的区别:
  var b = "08你好";
  console.log(+b); // NaN
  console.log(parseInt(b,10)); //8
```
