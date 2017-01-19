###写在前面
  本篇文章主要介绍:
  * 如何查找元素节点
  * 元素节点中的属性节点的操作
  * JS操作样式的常用操作

###以下例子用到的HTML
```HTML
  <div class="demo some play" id="demo">
    <div class="one item">
      <p>hello</p>
    </div>
    <div class="two item"></div>
    <div class="three"></div>
  </div>
```


###查找元素
  * getElementById(id)
  * querySelector(selector)

  以上查找方法只会返回首先找到的元素。
```js
  const demo = document.getElementById('demo');
```

  * getElementsByTagName(tagName)
  * getElementsByClassName(className)
  * querySelectorAll(selector)

  以上三个返回一个含有多个元素的HTMLCollection。

```js
  这里的querySelectorAll 和 querySelector 方法 和 jquery的查找方法类似。

  function $(str) {
    return document.querySelectorAll(str).length === 1 ? document.querySelectorAll(str)[0] : document.querySelectorAll(str);
  }
  const el6 = $('.one > p'); // <p>hello</p>
```

###基本属性
  * tagName 获取元素的大写名称
  * localName 获取元素的小写名称
  * id 获取或者设置元素的id值

```js
  console.log(demo.tagName); // DIV

  console.log(demo.id); // demo
  demo.id = "newdemo";
  console.log(demo.id); // newdemo

  console.log(demo.localName); //div
```

###获取Element中的属性节点
  * attributes() 获取节点的集合
  * setAttribute(name, value) 设置一个属性节点
  * getAttribute(name) 获取属性节点的值
  * hasAttribute(name) 是否存在这个属性节点
  * hasAttributes() 是否存在属性节点
  * removeAttribute(name) 删除这个属性节点

```js
  console.log(demo.attributes);  //返回一个NamedNodeMap

  demo.setAttribute('title', 'container');
  if (demo.hasAttribute('title')) {
    console.log(demo.getAttribute('title')); // "container"
  }
  demo.removeAttribute('title');

  console.log(demo.hasAttributes()); // false
```

###JS操作Element的css样式
  * 通过style属性改变html样式
  * 通过添加class改变html样式

```js
  通过style属性改变样式
  demo.style.backgroundColor = "red";
```
  * className 属性 可以获取和修改class节点的值
```js
  console.log(demo.className); // "demo some play"

   但是用它修改class并不是一个很好的选择。
```  
  * classList 返回一个DOMTokenList
```js
  console.log(demo.classList); //返回一个DOMTokenList
  demo.classList.forEach(function (item) {
    console.log(item);
  });
  /**
   * demo
   * some
   * play
   */
  console.log(demo.classList.length); // 3
  console.log(demo.classList.value === demo.className); // true
```
  classList上提供的方法：
  * add(name) 添加一个样式
  * remove(name) 移除一个样式
  * item(index) 获取下标为index的样式名称
  * toggle() 当这个元素的class只有一个值得时候，起到切换作用
  * contains(name) 样式列表中是否存在这个样式

```js
  demo.classList.add("bg");
  demo.classList.remove("play");
  console.log(demo.classList.item(0)); // demo
  console.log(demo.classList.contains('demo')); // true
```  
