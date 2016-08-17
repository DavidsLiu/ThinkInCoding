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

   对于对象键值的操作我们一般多用.key或者是[key]。推荐大家采用Object.defineProperty() + Object.create() :

```js
	var student = Object.create(Object.prototype);

	function defineProp(obj, key, value){
		var config = {
			value: value,
			writable: true,		//是否可以修改
			enumerable: true,	//是否可以枚举
			configurable: true  //是否可以删除
		}
		Object.defineProperty(obj, key , config);
	}

	defineProp(student,'role','学生');

	//实现继承
	var xiaoyun = Object.create(student);
	defineProp(xiaoyun,'name','daiqingyun');
	defineProp(xiaoyun,'age',23);
```   

  基本的构造函数的使用：

```js
	function Person(name){
		this.name = name;

		this.sayHi = function(){
			console.log("hi! i am " + this.name );
		}
	}

	var xiaoyun = new Person('xiaoyun');
	var xiaoming = new Person('xiaoming');	
```

  从上面我们可以知道，Person类中的sayHi()应该所有实例的共享方法，而我们目前的写法，每次实例化一个对象多需要重新定义一下sayHi()

```js
	function Person(name){
		this.name = name;
	}
	Person.prototype.sayHi = function(){
		console.log('hi! i am ' + this.name);
	}

	var xiaoyun = new Person('xiaoyun');
	var xiaoming = new Person('xiaoming');	
```  

  通过原型的方法达到方法的共享。


####The Module Pattern(模块模式)




