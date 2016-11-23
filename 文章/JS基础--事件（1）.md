###事件
  首先明确IE中是冒泡型事件处理，而标准浏览器中使用的是捕获冒泡型事件处理。

###HTML标签属性
```js
  <button type="button" name="button" onclick="alert('1');">确定</button>

  属性为on+事件名称，属性值为JavaScript字符串。
  这种方式虽然没有什么兼容性的问题，
  但是不满足结构与行为分离的思想。
  而且当你事件处理比较复杂时，不利于书写与阅读。
```

###元素的事件属性
```js
  window.onload = function () {
    console.log("1");
  }
  window.onload = function () {
    console.log('2');
  }

  这个注册方式，最大的缺点是会覆盖之前的注册事件。
  上述的例子，最终只会输出 1 。
  然后取消事件，可以通过：
  window.onload = null;

```
###监听事件
```js
  IE8以及之前的版本不支持。
  addEventListener(eventType, func, flag)
  第一个参数为事件名称，不需要加上on.
  第二个参数为事件执行的方法。
  第三个参数为false时，表示在冒泡阶段执行。为true时，表示在捕获阶段执行。99%的情况多是false。

  var btn = document.getElementById('btn');
  btn.addEventListener('click', function (e) {
    console.log('1');
  }, false);
  btn.addEventListener('click', function (e) {
    console.log('2');
  }, false);

  这样注册事件，1和2多会被输出。

  可以通过removeEventListener(eventType, func, flag)取消事件监听。
  btn.addEventListener('click', message, false);
  function message(e) {
    console.log('执行一次之后再也不执行了');
    btn.removeEventListener('click', message, false);
  }

  这里对于IE9以下的只能采用
  attachEvent(eventType, func)和detachEvent(evnetType, func)
  (因为在IE中只有冒泡型，所以没有第三个参数)
  第一个参数必须要加上on ！！！！！

```

###获取事件对象与目标元素
```js
  比如说上述例子中的message函数中就带有e这个参数
  但是IE与标准浏览器的写法却相差甚远。
  function message(e) {
    var event = e || window.event,//IE中事件对象是全局对象的属性
        target = e.target || e.srcElement;//IE中的兼容写法
  }
```

###阻止浏览器的默认行为
```js
  比如我们有一个a标签

  <a id="link" href="https://www.baidu.com">我是百度</a>

  然后我们想让这个a失效。

  var link = document.getElementById('link');
  link.onclick = function (e) {
    //阻止link的默认行为
    return false;
  }
  对于通过对象事件属性注册的方式，我们可以通过返回值来阻止。
  但是对于监听注册的方式，我们得采用preventDefault和returnValue

  link.addEventListener('click', cancelEvent, false);
  function cancelEvent(e) {
    var event = e || window.event;//用于IE8及以下。
    if (event.preventDefault) {
      event.preventDefault(); //标准浏览器
    }
    else if (event.returnValue) {
      event.returnValue = false; //IE
    }
  }
```
###阻止冒泡
```js
  首先我们要明白对于捕获冒泡的事件模型：
  捕获阶段 --> 处于目标阶段 --> 冒泡阶段
  例子：
  <div class="fath">
    <div class="child"></div>
  </div>

  var fath = document.querySelector('.fath'),
      child = document.querySelector('.child');

  fath.addEventListener('click', function () {
    console.log('father');
  });
  child.addEventListener('click', function (e) {
    console.log('children');
  });

  当我们在点击children的时候会log出children和father.
  正是由于冒泡的特点，在children上执行完的事件会向上冒泡，直到顶端。
  怎么组织冒泡呢。

  function stopBubble(e) {
    var event = e || window.event;
    if (event.stopPropagation) {
      event.stopPropagation(); //标准浏览器
    }
    else if (event.cancelBubble) {
      event.cancelBubble = true; //IE浏览器
    }
  }

  我们再仔细想想，我们可以这样写，避免冒泡造成的困扰：
  fath.addEventListener('click',function (e) {
    var event = e || window.event,
        target = event.target || event.srcElement;
    if (target.className === 'fath') {
      console.log('father');
    }
    else if (target.className === 'child') {
      console.log('children');
    }
  }, false);

  劲酒虽好，但不能贪杯哦。
```
