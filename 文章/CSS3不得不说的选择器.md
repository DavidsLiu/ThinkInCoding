###CSS选择器

####CSS1中的选择器
1、类型选择器   E
2、ID选择器   #id
3、类选择器    .class
4、包含选择器   E F
5、伪类选择器   :link
6、伪类选择器   :visited
7、伪类选择器   :active
8、伪类选择器   :hover
9、伪类选择器   :focus
10、伪元素选择器   ::first-line元素的第一行文本
11、伪元素选择器   ::first-letter元素文本中的第一个字符

####CSS2中的选择器
1、通配选择器   *
2、属性选择器   E[title]
3、属性选择器   E[title="some"]
4、属性选择器   E[title~="some"]title必须是空格间隔的值列表，其中含有some。
5、属性选择器   E[title|="some"]title必须是空格间隔的值列表，以some开头。
6、结构伪类选择器 E:first-child 父元素中第一个匹配E的子元素
7、伪元素选择器   E::before
8、伪元素选择器   E::after
9、子包含选择器   E > F  匹配E的子节点
10、相邻兄弟选择器   E + F  匹配E后面紧靠着的一个兄弟元素

####CSS3的选择器
1、属性选择器   E[title^="bar"] 以bar开头
2、属性选择器   E[title$='bar'] 以bar为后缀
3、属性选择器   E[title*='bar'] 包含bar
4、结构伪类选择器  E:root 实际上与html类型选择器一样
5、结构伪类选择器  E:nth-child(n) 选择在其父元素中第n个匹配E的子元素
6、结构伪类选择器  E:nth-last-child(n)  计算的顺序与nth-child(n)相反
7、结构伪类选择器  E:nth-of-type(n) 选择在其父元素中匹配E的第n个子元素
8、结构伪类选择器  E:nth-last-of-type(n) 计算的顺序与nth-of-type(n)相反
9、结构伪类选择器  E:last-child 父元素中最后一个位置匹配E的子元素
10、结构伪类选择器  E:first-of-type 父元素中匹配E的第一个子元素
11、结构伪类选择器  E:last-of-type  父元素中匹配E的最后一个元素
12、结构伪类选择器  E:only-child
13、结构伪类选择器  E:only-of-type
14、结构伪类选择器  E:empty (注意 文本也属于节点)
15、UI元素状态伪类选择器  E:enaled  可用
16、UI元素状态伪类选择器  E:disabled  不可用
17、UI元素状态伪类选择器  E:checked 选中

  实际上CSS2中的4、5完全可以被替代。

####结构伪类选择器的总结
  看完上面的结构伪类选择，可能萌新会晕吧，其实可以把它分为两类：
```js
  我们拿first-child和first-of-type比较一下

  ---------------
    first-child
  ---------------
  例如p:first-child 它查找的步骤：
  1、找到p的父节点
  2、找到父节点下面的第一个子元素
  3、看看这个元素是不是p(所以可能出现无效的情况)

  ------------------
    first-of-type
  ------------------
  例如p:first-of-type 它查找的步骤:
  1、找到p的父节点
  2、找到父节点下面所有的p元素(这步只是为了更好的说明问题)
  3、取出p元素集合中的第一个
```  

####选择器的优先级
1、内联样式 > ID选择器 > 类选择器 > 类型选择器
2、同样的优先级，声明的顺序越靠后，优先级越大（其实是覆盖了-_-!）
3、!important会覆盖其他的css声明，尽量避免使用。
