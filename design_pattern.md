###Design Pattern(设计模式JS的实现)

####The Singleton Pattern(单例模式)

  这里有两种实现的方式：

  第一种方式:

```js
	function Singleton(){
		if(typeof Singleton.instance === 'object'){
			return Singleton.instance;
		}
		this.name = 'daiqingyun';
		this.age = 23;
		//静态方法
		Singleton.instance = this;
	}	
```  

  第二种方式:

```js
	function Singleton(){
		var instance = this;
		this.name = 'daiqingyun';
		this.age = 23;
		//闭包
		Singleton = function(){
			return instance;
		}
	}	
```  


####The Constructor Pattern(构造函数模式)
  在JS中有三种方式声明对象：

 ```js
 	var obj = {};

	var obj = new Object();
	
	var obj = Object.create(Object.prototype);
 ``` 
