###CSS盒模型

####CSS1中的相关属性
    1、margin-top: 上边距
    2、margin-bottom: 下边距
    3、margin-left: 左边距
    4、margin-right: 右边距
    5、margin(复合属性): 上 右 下 左 | 上下 左右
    6、border-top: 上边框
    7、border-bottom: 下边框
    8、border-left: 左边框
    9、border-right: 右边框
    10、border(复合属性): 宽度 样式 颜色
    11、padding-top: 上补白
    12、padding-bottom: 下补白
    13、padding-left: 左补白
    14、padding-right: 右补白
    15、padding(复合属性): 上 右 下 左 | 上下 左右
    16、width:
    17、height:
    18、float:
    19、clear:
    20、border-width:
    21、border-color:
    22、border-style: solid | dashed | double | dotted ....
    23、border-top-width:
    24、border-bottpm-width:
    25、border-left-width:
    26、border-right-width:

####CSS2中的相关属性
    1、border-top-color:
    2、border-bottom-color:
    3、borer-left-color:
    4、border-right-color:
    5、border-top-style:
    6、border-bottom-style:
    7、border-left-style:
    8、border-right-style:

####CSS3引入弹性盒模型
    1、box-align: start | end | center | baseline
    2、box-direction: normal | reverse
    3、box-flex: value(数值)
    4、box-flex-group: 定义自适应子元素群组
    5、box-lines: 定义子元素分列显示
    6、box-ordinal-group: 定义元素在盒子内显示的位置
    7、box-orient: 定义盒子分布的坐标轴 horizontal | vertical | inline-axis | block-axis
    8、box-pack: 盒子水平分布 start | end | center | justify

####flex的现状
  在PC端几乎就没有使用flex的，因为很多的浏览器多还没来得及实现。但是flex应该是以后的趋势。在移动端，大部分多是webkit浏览器所以用起来应该没有大问题。后面我会在移动端使用flex，应该会写一篇针对于flex的文章，大家敬请期待^_^。

####border-image
```
    ----------------
      border-image
    ----------------
    W3School上给出的示例：border-image: url(img/border.png) 30 30 round;
    其中有个有个叫做border-image-slice的属性，其实大家可以看下面的图，便能理解它的意思。
    最后一个属性除了round还有stretch。
```
<center>![image](https://developer.mozilla.org/files/3814/border-image-slice.png)</center>

####border-radius
```
    -----------------
      border-radius
    -----------------
    对于border-radius，我们一般多是这样写border-radius:5px;
    其实border-radius: topxr rightxr bottomxr leftxr / topyr rightyr bottomyr leftyr;
    这样能实现很多意想不到的效果。
```

####box-shadow
```
    ----------------
      box-shadow
    ----------------
    同样支持逗号分隔的值列表。
    box-shadow: 水平偏移量 垂直偏移量 [阴影的模糊程度] [阴影的尺寸] 颜色 [option],.......
    option也为可选属性: 没有填写时表示外阴影，如果填写inset则为内阴影。
```

####box-sizing
```
    ------------------
      box-sizing
    ------------------
    其实这个可能被大多数人忽略，但是如果你忽略它，就会发现意想不到的结果。
    box-sizing: border-box | content-box; (默认值content-box)
    简单的来说：
    border-box: width = border + padding + content;(高一样)
    content-box: width = content;(border,padding绘制在width,height的外面)
```

####background-size与background-position
```
    ------------------
      background-size
    ------------------
    background-size: contain | cover | percentage
    contain: 使图像放大或缩小到能够最大限度的填充容器。(是不是很绕-_-)
    cover:  最大限度的放大或者缩小图像，可能或导致显示不全。
    percentage: 显示原图的百分比大小。

    -------------------------
      background-position
    -------------------------
    background-position: 水平偏移量 垂直偏移量;
    一般我们多会采用center、left、right、bottom.
    但是你也可以采用像素或者百分比，但是你要记住一点，这两个值就相当于背景图的左上角的坐标，而坐标系的原点在你的这个元素的左上角，这样会让你很好理解。

    也正是因为这两个属性的诞生，出现了雪碧图的使用。

    还有两个用的不是太多的属性
    -----------------------
      background-origin
    -----------------------
    这个主要是以什么标准来设定背景图片的左上角的坐标
    background-origin:  content-box | border-box | padding-box;
    content-box: 以内容区域的左上角为准;
    border-box: 以边框区域的左上角为准;
    padding-box: 以补白区域的左上角为准;

    ----------------------
      background-clip
    ----------------------  
    裁剪背景区域
    background-clip: content-box | border-box | padding-box;
```

####outline
```
    --------------
      outline
    --------------
    outline: color style width;
    特别是input的样式就加了一个outline，所以要写重置input的样式，要把outline重置了。
```

####margin-collapse
```
    ------------------
      margin-collapse
    ------------------
    什么叫margin-collapse，其实在table中有个叫border-collapse的，差不多的意思，看一下具体的情况:

    1、发生在上下相邻的两个div的上下外边距：
    通常我们认为它们的外边距是a+b,但是由于发生margin-collapse导致得到的是max(a,b);
    对于这种情况最好是只设定单一的下边距或者上边距。

    2、发生在父子元素的上边距：
    子元素的margin-top不会生效，但是父元素的margin-top为max(a,b);
    解决方法：
    (1)父类设置border
    (2)父类设置padding
    (3)父类设置overflow:hidden;
    (4)父类设置为inline-block;

```
