###CSS文本修饰

####CSS1中的相关属性
    1、font-family: 字体类型
    2、font-style: normal | italic(斜体) | oblique(倾斜)
    3、font-variant: normal | small-caps(小型的大写字母)
    4、font-weight: 100~900 | normal(400) | bold(700) | lighter | bolder
    5、font: 复合属性
    5、color：
    6、word-spacing: 词间距
    7、letter-spacing: 字符间距
    8、text-decoration: none | underline | overline | line-through
    9、vertical-align: 垂直方式
    10、text-transform: none | capitalize | uppercase | lowercase
    11、text-align: center | right | center | justify
    12、text-indent: 首行缩进
    13、line-height: 行高

####CSS2中的相关属性
    1、font-size-adjust: 是否强制对文本使用同一尺寸
    2、font-stretch: 字体是否横向拉伸变形字体
    3、text-shadow: 文字阴影
    4、direction: 文本流入的方向 ltr | rtl
    5、unicode-bidi

####CSS3中相关属性（颜色的不透明度是最大的亮点）
    1、text-shadow: 横向偏移 纵向偏移 模糊程度 模糊颜色
    2、text-overflow: ellipsis(省略号显示裁剪的文本) | clip(裁剪文本)
    3、word-wrap: normal | break-word
    4、hsl: H(色调)0~360 S(饱和度)0%~100% L(亮度)0%~100%
    5、hsla:
    6、rgba:
    7、opacity: 不透明度 0~1

####text-shadow
  之前我还写了一篇[3种方式实现text-shadow的文章](https://github.com/15751165579/ThinkInCoding/blob/master/%E6%96%87%E7%AB%A0/svg%E7%B3%BB%E5%88%97--%E6%96%87%E5%AD%97%E9%98%B4%E5%BD%B1%E7%9A%84%E5%AE%9A%E5%88%B6.md)，大家可以看看^_^。
```js
    -----------------
      text-shadow
    -----------------
    一般我们多是这样用的: text-shadow: 5px 5px 10px rgb(23,123,222);
    其实text-shadow也支持带有逗号的值列表，所以我们又可以用text-shadow完成文字描边的效果:
    text-shadow: 3px 0 #fff,-3px 0 #fff,0 3px #fff,0 -3px #fff;
```
<center>![image](http://o8sux93eg.bkt.clouddn.com/%E6%96%87%E5%AD%97%E6%8F%8F%E8%BE%B9.png)</center>

####font
  一般设置字体多采用font这个复合属性，不仅仅是字体，很多其他的样式多乐于去采用复合属性声明
```
    ------------
      font
    ------------
    例如 font:14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;

    14px表示字体的大小;
    1.5表示行高;
    后面是一段字体的声明，客户端会优先使用前面的字体，如果没有安装，则会使用客户端默认字体。
    最后一个sans-serif表示使用没有衬线的字体。
```
