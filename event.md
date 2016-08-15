###今天我们来聊聊JavaScript中的事件处理
------------------------------------

####W3C的事件
  之前我们可能用的多是on+eventType,但是现在我们应该采用的新方法注册和取消事件

```js
	event.addEventListener(type,listener,[useCapture]);
	event.removeEventListener(type,listener,[useCapture]);
```

  type: 是事件的类型（再也不用加on了。。）＜/br＞
  listener: 是事件触发执行的方法,这里要特别注意listener不要直接写function(){};涉及到调用removeEventListener()方法。＜/br＞
  useCapture: false表示冒泡阶段，true表示捕捉阶段。＜/br＞
