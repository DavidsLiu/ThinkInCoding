###今天我们来聊聊JavaScript中的事件处理
------------------------------------

##W3C的事件
  之前我们可能用的多是on+eventType,但是现在我们应该采用的新方法注册和取消事件

```js
	event.addEventListener(type,listener,[useCapture]);
	event.removeEventListener(type,listener,[useCapture]);
```
