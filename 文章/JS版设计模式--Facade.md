###外观模式(Facade)

  外观模式主要是定义一个高层接口，使复杂的子系统更加容易使用。

###例子
```js
    比如我们在浏览器中限制a标签的默认行为。
    这时候我们就得考虑IE浏览器与标准浏览器的兼容问题。

    (虽然这是个简单的例子，但是能够说明问题)

    var link = document.getElementById('link');
    link.onclick = function (e) {
      //阻止link的默认行为
      cancelEvent(e);
    }

    function cancelEvent(e) {
      var event = e || window.event;//用于IE8及以下。
      if (event.preventDefault) {
        event.preventDefault(); //标准浏览器
      }
      else if (event.returnValue) {
        event.returnValue = false; //IE
      }
      else {
        return false; //用于处理使用对象属性注册的处理程序
      }
    }

    我们通过外观模式，将复杂(可能还不够复杂-_-!)的兼容操作通过最终的cancelEvent函数来调用，从而达到我们想要的效果。
```  
