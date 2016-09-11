####JavaScript语言精髓

#####注释
    1. 单行注释 //
    2. 块注释 /* */ 容易造成语法错误

#####数字类型
    1. JavaScript中只有单一的Number类型
    2. NaN(Not a Number),NaN != NaN
    3. isNaN(number)
    4. Infinity, -Infinity

#####字符串
    1. JavaScript并不像其他语言有char类型，采用单个字符的字符串表示单个字符
    2. Unicode是一个16位的字符集，所以JavaScript中的字符多是16位的.
    3. '\'表示转义字符。一般Unicode码是以'\u'开头的。

#####语句
    1.满足if中false条件的情况:false、null、undefined、0、''、NaN。（对于[]它并不会解释为false）
    2.对于for in 语句 一般采用obj.hasOwnProperty()判断是自己的属性还是从原型要查找的属性。

#####对象
    1.检索对象中没有的属性，会返回undefined,通常采取的方法
```js
    var name = student.name || '没有姓名';
```
    2.尝试检索undefined的属性的值会报typeError,通常采取的方法:
```js
    student.name //undefined
    student.name.friend // typeError
    (student.name && student.name.friend) //undefined
```
    3.对象通过引用来传递(它们之间的赋值，实际上是将指针指向同一块内存空间)
    4.delete只会删除对象中确定的属性，并不会触及到原型上的属性。

#####函数
    1. 函数中this、arguments
    2. this取决于函数的调用模式：方法调用模式、函数调用模式、构造器调用模式和apply调用模式。
    3. ？？如何实现链式编程
    4. ？？如何套用(curry)
    5. 继承
