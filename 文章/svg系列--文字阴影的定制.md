####svg系列--文字阴影的定制

####CSS3实现文字阴影
  css3实现文字阴影比较的方便，一个样式就能解决：
```js
  text-shadow: 5px 5px 3px rgb(213,213,213);
  由左往右：
  水平偏移量
  垂直偏移量
  阴影模糊程度
  阴影颜色
```
  下面是效果图：
<center>![image](http://o8sux93eg.bkt.clouddn.com/cssTextShadow.png)</center>


####canvas实现文字阴影
  本人canvas学的不是太精，目前只能采用以下方式实现文字阴影：
```js
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowColor = "rgb(213,213,213)";
  context.shadowBlur = 4;
  context.font = "60px Helvetica, Arial, sans-serif";
  context.fillText("I Love SVG",20,200);
```  

  效果图:
<center>![image](http://o8sux93eg.bkt.clouddn.com/canvasTextShadow.png)</center>

####svg实现定制的文字阴影
   其实我们从上面的两种实现方式可以看出，文字阴影的样式，我们是无法改变的。那么svg登场了：
```html
  <svg width="1000" height="400">
    <defs>
      <pattern id="textPattern" width="1" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <rect x="0" y="0" width="1" height="2" fill="rgb(213,213,213)"></rect>
      </pattern>
      <text id="textContent" x="10" y="300">I Love SVG</text>
    </defs>
    <use x="8" y="8" width="1000" height="400" xlink:href="#textContent" fill="url(#textPattern)"></use>
    <use x="0" y="0" width="1000" height="400" xlink:href="#textContent"></use>
  </svg>
```
  实现的思路主要是通过pattern(模式)填充一个文字样式，作为原文字的阴影。上述代码中的defs pattern use 我上篇文章[svg系列-基础](https://github.com/15751165579/ThinkInCoding/blob/master/%E6%96%87%E7%AB%A0/svg%E7%B3%BB%E5%88%97--%E5%9F%BA%E7%A1%80.md)中有他们的基础语法。其实我在MDN上也找了一下canvas的Pattern类，只找到了createPattern()这个方法，但是这个方式只能以图片作为载体，似乎不能完全满足我们的需求。如果有精通canvas的同学，希望能给一个能定制文字阴影的方法。

  放上效果图
<center>![image](http://o8sux93eg.bkt.clouddn.com/svgTextShadow.png)</center>
