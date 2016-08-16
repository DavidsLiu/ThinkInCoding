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

  对于event.currentTarget是注册事件的对象。只有

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

####实现一个事件模型
  1、创建一个对象来保存注册的事件。

  2、对一个事件名称绑定多个响应事件。

  3、触发事件。

  4、取消事件。

```js
	var EventModel = function(){
		this._listeners = {};
	}
	//注册事件
	EventModel.prototype.on = function(eventName, callback){
		var listenersCallback = this._listeners[eventName] || [];
		listenersCallback.push(callback);
		this._listeners[eventName] = listenersCallback;
	}
	//触发事件
	EventModel.prototype.trigger = function(eventName){
		var listenersCallback = this._listeners[eventName];
		var self = this;
		if(!Array.isArray(listenersCallback)){
			return;
		}
		listenersCallback.forEach(function(callback){
			callback.call(this);
		});
	}
	//取消事件
	EventModel.prototype.cancel = function(eventName){
		var listenersCallback = this._listeners[eventName];
		if(listenersCallback){
			this._listeners[eventName] = [];
		}
	}
```

####实现事件代理
  事件代理的优点主要是减少事件的注册、新增子对象的时候无需再对其绑定事件、减少对DOM的操作（千万不要过度使用）

```js
	function delegateEvent(element, selector, eventType, callback){
		if(element.addEventListener){
			//W3C标准下
			element.addEventListener(eventType, fn, false);
		}
		else {
			//IE标准下
			element.attachEvent('on' + eventType, fn);
		}
		function fn(e){
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(matchSelector(target, selector)){
				if(callback){
					//js中代理模式 只是call apply的傀儡。。。。
					callback.call(target,target);
				}
			}
		}
		function matchSelector(target, selector){
			//id选择器
			if(selector.charAt(0) === "#"){
				return target.id === selector.slice(1);
			}
			//类名选择器
			else if(selector.charAt(0) === "."){
				return target.className.indexOf(selector.slice(1)) !== -1;
			}
			//普通的选择器
			return target.tagName.toLowerCase() === selector.toLowerCase();
		}
	}
	var ullist = document.querySelector('#some');
	delegateEvent(ullist, 'li', 'click', function(e){
		//e 是当前的目标的对象
	});
```

####事件的派发
  IE支持fireEvent方法触发事件、W3C标准是采用dispatch来实现事件的触发。

```js
	var fireEvent = function fireEvent(element, event) {
		if(document.createEventObject){
			//IE浏览器下
			var _event = document.createEventObject();
			return element.fireEvent('on'+event, _event);
		}
		else {
			//W3C标准下
			var _event = document.createEvent('Event');
			_event.initEvent(event, true, true);
			return element.dispatchEvent(_event);
		}
	}
```
  在W3C标准下，我们可以用很多新的方法，比如创建一个事件：

```js
	var _event = new Event('message',{'bubbles':true, 'cancelable':true});
```

  同样创建的事件可以传递参数：

```js
	var _event = new CustomEvent('message',{
		'detail': {
		'name': 'daiqingyun',
			'age': 21
		}
	})
```






