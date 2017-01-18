###写在前面
  本来开开心心的看着ityped.js的源码，才看到几十行就发现怎么有两个方法没见过。然后翻看了一下MDN,发现自己的知识库要更新了。所以花了点时间总结一下原生DOM操作，大致分为三个部分：Node解读、Element上的操作、DOM中的位置计算。


###Node的分类
  Node中有很多类，但是有几个你必须记住：

```js
    | 类型           |  nodeType |
    | -----------   |  --------  |  
    | 元素 Element   |     1     |
    | 属性 Attr      |     2     |
    | 文本 Text      |     3     |
    | 注释 Comment   |     8     |
    | 文档 Document  |     9     |
```

###创建Node
  创建一个元素节点
```js
  /**
   * @param 元素的名称
   */
  const el = document.createElement('div');
```
  创建一个属性节点
```js
  /**
   * @param 属性的名称
   */
   const attr = document.createAttribute('title');
   attr.value = "content";
```  
  创建一个文本节点
```js
  /**
   * @param 文本内容
   */
  const txt = document.createTextNode('i am student');
```

###nodeName属性
  对于元素节点，返回的是元素的tagName
```js
  el.nodeName // DIV
```  
  对于属性节点，返回为属性的名称
```js
  attr.nodeName // title
```  
  对于文本节点，始终返回#text
```js
  txt.nodeName // #text
```
  对于document节点， 始终返回#document
```
  document.nodeName // #document
```  

###nodeValue属性
