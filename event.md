###JavaScript中的事件处理
------------------------------------

####事件
  W3C事件模型分为3个阶段: 捕捉阶段 ---》 处于目标阶段 ---》 冒泡阶段
  (IE8以下不支持捕捉阶段)

  对于event的对象在W3C标准中直接通过传递的形参获得，而在IE中event是一个全局变量。

```js
	function action(e){
		e = e || window.event;
	}
```  
  
  对于W3C中的event.target,在IE中需要采用event.srcElement:

```js
	function action(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
	}
```  

  对于event.currentTarget是注册事件的对象。

  阻止浏览器的默认行为:

```js
	function action(e){
		e = e || window.event;
		if(e.preventDefault) {
			//W3C标准下
			e.preventDefault();
		}
		else {
			//IE标准下
			e.returnValue = false;
		}
	}
```  

  阻止事件的冒泡:

```js
	function action(e) {
		e = e || window.event;
		if(e.stopPropagation) {
			//W3C标准下
			e.stopPropagation();
		}
		else {
			//IE标准下
			e.cancelBubble = true;
		}
	}
```  

####W3C的事件
  之前我们可能用的多是on+eventType,但是现在我们应该采用的新方法注册和取消事件

```js
	event.addEventListener(type, listener, [useCapture]);
	event.removeEventListener(type, listener, [useCapture]);
```

  type: 是事件的类型（再也不用加on了。。）

  listener: 是事件触发执行的方法,这里要特别注意listener不要直接写function(){};涉及到调用removeEventListener()方法。

  useCapture: false表示冒泡阶段，true表示捕捉阶段。

####IE中的事件
  IE总是别出心裁：
```js
	event.attachEvent(eventName, callback);
	event.detachEvent(eventName, callback);
```

  eventName: 事件的类型，可悲的是还要加上on。

  callback: 事件触发的执行方法，还是不要直接写function(){}。

  此方法只能在冒泡阶段。



