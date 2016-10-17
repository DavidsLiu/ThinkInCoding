###svg系列--基础
  这一系列的文章会总结svg的基础知识和一些经典的案例。

####svg简介
    SVG（Scalable Vector Graphics）is an XML-based Language for creating graphics.
    这是MDN英文文档对svg的介绍。

    svg支持css,这一点有效的将图形和样式区分开。

    svg的应用：
    1、绘图
    2、动画

####如何在网页中引用svg元素
```js
    svg元素可以通过<embed>、<object>或者<iframe>嵌入网页之中，但是我们这里推荐使用<embed>,兼容性比较好。

    <embed src="circle.svg" type="image/svg+xml" />

    <svg width="" height="">绘制的内容</svg>
```

####一些公共属性
```js
    ----------------
      公共属性
    ----------------

    fill: 填充色 | url(id)这里主要是引用渐变色作为背景
    stroke: 线条的颜色
    stroke-width: 线条的宽度
    stroke-linecap: 线条末尾的样式 (默认)butt (圆角)round (方形)square ----- round和square会影响线条的长度
    opacity: 不透明度  0~1
    fill-rule: nonzero (非零环绕原则)evenodd
    stroke-dasharray: 创建虚线数组 x,y,z,..... (长度，间隔，长度，间隔，。。。。)
    stroke-dashoffset: 偏移
    filter: url(id) 添加滤镜  
```    

####绘制矩形
```js
    ---------
      矩形
    ---------
    <rect x="" y="" rx="" ry="" width="" height=""></rect>
    (x, y): 左上角坐标
    rx: x轴圆角半径
    ry: y轴圆角半径
    width: 长度
    height: 高度  
```

####绘制圆
```js
    ---------
      圆
    ---------
    <circle cx="" cy="" r=""></circle>
    (cx, cy): 圆心
    r: 半径
```

####绘制椭圆
```js
    --------------
      椭圆
    --------------
    <ellipse cx="" cy="" rx="" ry=""></ellipse>
    (cx, cy): 中心点
    rx: x轴半径
    ry: y轴半径
```

####绘制线条
```js
    --------
      线条
    --------
    <line x1="" y1="" x2="" y2=""></line>
    (x1, y1): 线条的起始点
    (x2, y2): 线条的结束点
```

####绘制多边形
```js
    ---------------
      多边形polygon
    ---------------
    <polygon points=""></polygon>  
    points: x,y x1,y1 ........
```

####绘制曲线
```js
    ----------------
      曲线polyline
    ----------------
    <polyline points=""></polyline>  
    points: x,y x1,y1 .........
```

####绘制路径
```js
    ---------------
      路径
    ---------------
    <path d=""></path>
    d: 路径的描述
    主要的语法：
    M： moveTo
    L: lineTo
    H: horizontal lineTo
    V: vertical lineTo
    C: curveto
    S: smooth curveto
    Q: quadratic Bézier curve
    T: smooth quadratic Bézier curveto
    A: elliptical Arc
    Z: closepath

    命令区分大小写，除了Z。大写表示绝对位置，小写表示相对位置。  
```

####绘制文本
```js
    ---------------
      绘制文本
    ---------------
    <text x="" y="" text-anchor="" dx="" dy="">text</text>
    (x, y): 文字左下角的起始坐标
    text-anchor: start middle end 文本锚点(可能会和我们预期的坐标有出入)
    dx: 横轴的偏移
    dy: 纵轴的偏移

    路径文本的绘制
    <textPath xlink:href="#path">text</textPath>

    <text>中还可以嵌套<tspan x="" y="">text</tspan>

    同时文本也可以作为超链接
    <a xlink:href="" target="">
      <text></text>
    </a>
```

####滤镜的使用
```js
    -----------------
      滤镜
    -----------------
    <filter id=""></filter>
```
  [MDN的案例](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)
####渐变
```js
  --------------
    渐变
  --------------
  线性渐变
  <linearGradient x1="" y1="" x2="" y2="" gradientUnits>
    <stop offset="" style="stop-color:;stop-opacity:;"></stop>
  </linearGradient>
  gradientUnits: 定义坐标 userSpaceOnUse(不会对pattern的单位进行缩放) | objectBoundingBox(会)
  x1: 渐变开始横坐标
  y1: 渐变开始纵坐标
  x2: 渐变结束横坐标
  y2: 渐变结束纵坐标
  offset: 渐变开始的位置 0% - 100%

  放射性渐变
  <radialGradient cx="" cy="" r="" fx="" fy="" gradientUnits>
    <stop offset="" style="stop-color:;stop-opacity:;"></stop>
  </radialGradient>
  gradientUnits: 定义坐标 userSpaceOnUse(不会对pattern的单位进行缩放) | objectBoundingBox(会)
  cx: 外层圆心横坐标
  cy: 外层圆心纵坐标
  fx: 内层圆心横坐标
  fy: 内层圆心纵坐标
  r: 发散的半径
  offset: 渐变开始的位置 0% - 100%
```

####常用的几个标签
```js
  ----------
    裁剪
  ----------
  <clipPath id="">裁剪路径</clipPath>

  ----------
    引用元素
  ----------
  <defs>声明引用元素</defs>

  ----------
    拷贝
  ----------
  <use x="" y="" width="" height="" xlink:href="id"></use>    
  (x, y): 克隆对象的左上角坐标
  width: 克隆对象的宽度
  height: 克隆对象的高度
  xlink:href 引用克隆对象

  ----------
    模式
  ----------  
  <pattern id="" width="" height="" patternUnits="" patternTransform="">模式内的形状</pattern>
  width: 模式的宽度
  height: 模式的高度
  patternUnits: 定义pattern的坐标系统 userSpaceOnUse(不会对pattern的单位进行缩放) | objectBoundingBox(会)
  patternTransform: 变换

  ----------
    遮罩
  ----------
  <mask maskUnits="" x='' y="" width="" height="">内容</mask>
  (x, y): 裁剪的左上角坐标。
  width: 裁剪的宽度
  height: 裁剪的高度

```


####CSS3中的svg的影子
```js
    ---------------------
      clip-path 裁剪
    ---------------------
    clip-path:
    第一种: url(id) 配合svg的<clipPath>
    第二种: polygon(x y,x1 y1,x2 y2,.......)
    第三种：inset(top right bottom left round rt rr rb rl) 圆角矩形

    这里比较重要的一点就是polygon的过渡动画必须要求各个状态的点的个数一样
```
