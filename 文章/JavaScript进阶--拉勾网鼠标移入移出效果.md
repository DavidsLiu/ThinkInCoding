###JavaScript进阶
  1024丝毫不减少我敲写代码的激情，因为我闻到了代码的味道。

####先上效果图（gif自己录制的，有点难看抱歉）
<center>![image](http://o8sux93eg.bkt.clouddn.com/lg.gif)</center>

  其实也是个偶然的机会，让我想去研究一下这个效果。主要是由于有个群里的人发了个讲解这个效果的链接，当时也没怎么在意，然后过两天，突然就想起这件事，便去拉勾网一看，哎呦效果不错，就想去找找那个链接看一下。没想到找了半天没找到了，没办法只能自己研究了。（其实做完之后，然后自己这个独立思考的意识还是不够啊，惭愧！）

####思路
```
    ------------
      HTML结构
    ------------
    <ul>
        <li>
            <div class="bg">
                <p>JS</p>
            </div>
        </li>
        .....
    </ul>

    li做为鼠标移入(mouseenter)和鼠标移出(mouseleave)的载体。
    div做为动画执行的载体。

    ------------
      CSS
    ------------
    div采用absolute定位，通过top、left改变它的位置。
    由于div的top、left可能会超出li的大小，所以要设置li的overflow:hidden;

    -----------
      JS
    -----------
    1、采用JS操纵CSS3 transition动画
    2、如何判断鼠标移入移除的方向
```
####鼠标坐标的相关知识
```
    ------------------
      MouseEvent对象
    ------------------
    下面介绍几个MouseEvent中坐标的相关知识：
    (clientX, clientY): 以可视区域为参考系的坐标。
    (pageX, pageY): 以整个页面(包括滚动条卷出的区域)为参考系的坐标。
    (screenX, screenY): 以你的电脑屏幕为参考系的坐标。

    获取某个元素内部的坐标
    function pointTo(element, e) {
        var elementBox = element.getBoundingClientRect();
        return {
            x: e.clientX - elementBox.left,
            y: e.clientY - elementBox.top
        };
    }

    计算元素左上角的坐标
    function startPoint(element){
        var x = 0,y = 0;
        while(element != null) {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return {
            x: x,
            y: y
        }
    }

    获取元素的宽度和高度(不要认为是width和height 新手特别容易犯错)
    offsetHeight与offsetWidth
```

####简单的封装一下CSS3 transition动画
```
    /*
        options参数:
        obj: 运动的对象
        speed: 运动的持续时间(可选)
        changeStyle: 改变的属性，这里可能多个，所以采用函数的方式(可选)
        callback: 回调函数(可选)
    */
    function animation(options){
        if(!options.obj) {
            return false;
        }
        //设置默认持续时间
        options.speed = options.speed || '.5s';
        options.obj.style.transition = "all " + options.speed + " ease-in-out";

        options.changeStyle.call(options.obj);

        var flag = false;
        options.obj.addEventListener('transitionend',function(){
            //这里主要由于transitionend在每个属性的动画执行完多会走一遍，所以我们要让它只执行一次。
            if(!flag) {

                options.callback && options.callback();
            }
        },false);
    }
```

####如何确定方向
  这里要用到数学中的正切相关的概念，我自己画了一张图，不知道你们能不能看特明白：
<center>![image](http://o8sux93eg.bkt.clouddn.com/lg_self.png)</center>

```
    --------------------
      得到元素的运动方向
    --------------------

    function getDirection(element,startPoint,pagePoint){
        var halfWidth = element.offsetWidth / 2,halfHeight = element.offsetHeight / 2;
        //得到中心点
        var center = {
            x: startPoint.x + halfWidth,
            y: startPoint.y + halfHeight
        }
        //得到鼠标偏离中心点的距离
        var disX = pagePoint.x - center.x;
        var disY = pagePoint.y - center.y;
        if(disY < 0 && Math.abs(disY / disX) >= 1) {
            //上方
            return 1;
        }
        else if(disY > 0 && Math.abs(disY / disX) >= 1) {
            //下
            return 2;
        }
        else if(disX < 0 && Math.abs(disY / disX) < 1) {
            //左
            return 3;
        }
        else {
            //右
            return 4;
        }
    }
```


####启动事件的代码，有注释
```
    /*
        options中的参数:
        触发事件的载体: targetElement
        执行动画的载体: animationElement
    */
    function HoverAction(options) {
        if(!options.targetElement || !options.animationElement) {
            return false;
        }
        this.targetElement = options.targetElement;
        this.animationElement = options.animationElement;
        this.timeId = null;
        this.speed = "0.3s";
    }
    HoverAction.prototype.addEvent = function() {
        //保存this的指向
        var _this = this;
        _this.targetElement.addEventListener('mouseenter',function(e){
            //得到鼠标的坐标
            var point = {
                x: e.pageX,
                y: e.pageY
            }
            console.log(point);
            //获得方向
            var dir = getDirection(_this.targetElement,startPoint(_this.targetElement),point);
            clearTimeout(_this.timeId);
            //取消过渡动画(防止重置动画载体位置时触发过渡效果)
            _this.animationElement.style.transition = "";
            //得到运动的方向，要确定动画载体的开始位置
            switch(dir){
                case 1:
                    _this.animationElement.style.top = "-100%";
                    _this.animationElement.style.left = "0";
                    break;
                case 2:
                    _this.animationElement.style.top = "100%";
                    _this.animationElement.style.left = "0";
                    break;
                case 3:
                    _this.animationElement.style.top = "0";
                    _this.animationElement.style.left = "-100%";
                    break;
                case 4:
                    _this.animationElement.style.top = "0";
                    _this.animationElement.style.left = "100%";
                    break;
            }
            //异步执行
            _this.timeId = setTimeout(function(){
                animation({
                    obj: _this.animationElement,
                    speed: _this.speed,
                    changeStyle: function(){
                        this.style.top = "0";
                        this.style.left = "0";
                    }
                });
            },20);
        },false);
        _this.targetElement.addEventListener('mouseleave',function(e){
            var left,top;
            var point = {
                x: e.pageX,
                y: e.pageY
            }
            clearTimeout(_this.timeId);
            _this.animationElement.style.transition = "";
            var dir = getDirection(_this.targetElement,startPoint(_this.targetElement),point);
            switch(dir) {
                case 1:
                    top = '-100%';
                    left = '0';
                    break;
                case 2:
                    top = '100%';
                    left = "0";
                    break;
                case 3:
                    left = "-100%";
                    top = "0";
                    break;
                case 4:
                    left = "100%";
                    top = "0";
                    break;
            }
            _this.timeId = setTimeout(function(){
                animation({
                    obj: _this.animationElement,
                    speed: _this.speed,
                    changeStyle: function(){
                        this.style.top = top;
                        this.style.left = left;
                    }
                });
            },20);
        },false);

    }
```

  [源码](https://github.com/15751165579/ThinkInCoding/blob/master/JS/mouse.html)
