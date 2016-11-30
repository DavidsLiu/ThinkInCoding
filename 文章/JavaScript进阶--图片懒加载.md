

###懒加载技术
  图片对于网络加载的负担相比较其他资源是非常大的，而且整个网页的图片并不是所有的多是第一时间呈现给用户。懒加载就是其中一种解决方案（本质上是延迟加载）。

###懒加载原理
  * 设置img标签的src属性为一张占位图。
  * 设置img标签自定义属性data-src为真是图片的url。
  * 页面加载完成后，根据你设定的时机替换img标签的src。
  效果图:
  <center>![image](http://o8sux93eg.bkt.clouddn.com/ljz.png)</center>

  获取页面所有的img。
```js
  var imgNode = document.querySelectorAll('img'),
      imgArr = Array.prototype.slice.call(imgNode,0),
      imgInfo = [];
  for (var i = 0, max = imgArr.length; i < max; i++) {
    var temp = {};
    temp.img = imgArr[i];
    temp.flag = false;
    imgInfo.push(temp);
  }
```
  设计的lazyload方法:
```js
  function lazyLoad() {
    /**
     * 这里我是当图片的左上角的坐标在可视区域内，就展示这张图片。
     * （不是很合理，主要是为了很明显的看出测试效果）
     *  (看完这篇大家可以定制自己的懒加载策略)
     */
    for (var i = 0, max = imgInfo.length; i < max; i++) {
      /**
       * 优化for循环
       */
      if (!imgInfo[i].flag) {
        /**
         * poi: 获取元素在整个网页中的坐标
         * y: 获取滚动条的位移
         */
        var poi = getElementPoistionInWinow(imgInfo[i].img),
            y = getDocumentScroll().y;
        //呈现图片的时机
        if (poi.y > y && poi.y < y + window.innerHeight) {
          if (imgInfo[i].img.getAttribute('src') === 'images/place.png') {
            imgInfo[i].img.src = imgInfo[i].img.getAttribute('data-src');
            imgInfo[i].flag = true;
          }
        }
      }
    }
  }
```  
  获取元素在整个页面中的坐标：
```js
  function getElementPoistionInWinow(ele) {
    var top = 0,
        left = 0,
        width = ele.offsetWidth, //元素的宽度
        height = ele.offsetHeight; //元素的高度
    while(ele) {
      top += ele.offsetTop;
      left += ele.offsetLeft;
      ele = ele.offsetParent; //元素的父元素
    }
    return {
      y: top,
      x: left,
      width: width,
      height: height,
    }
  }
```
  获取滚动条的偏移量：
```js
  /**
   * 完全兼容写法
   */
  function getDocumentScroll() {
    var x,
        y;
    x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return {
      x: x,
      y: y,
    }
  }
```
  采用undefscore.js的函数节流
```js
  window.addEventListener('scroll',_.throttle(lazyLoad,1000 / 60), false);
```  
  别忘了在加载事件中加上：
```js
  /**
   * DOMContentLoaded兼容性不好，大家可以用第三方库中的方法。
   */
  document.addEventListener('DOMContentLoaded', lazyLoad, false);
```  
  [github源码地址](https://github.com/15751165579/ThinkInCoding/blob/master/JS/base/%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD.html)
