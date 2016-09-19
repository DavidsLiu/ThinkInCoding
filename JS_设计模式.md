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


####The Observer Pattern(观察者模式)

```
		var EventModel  = function(){
			this._listeners = {};
		}
		EventModel.prototype.on = function(eventName, callback){
			var listeners = this._listeners[eventName] || [];
			listeners.push(callback);
			this._listeners[eventName] = listeners;
		}
		EventModel.prototype.trigger = function(eventName){
			var args = Array.prototype.slice.call(arguments,1);
			var listeners = this._listeners[eventName];
			var _this = this;
			if(Array.isArray(listeners)){
				listeners.forEach(function(callback){
					callback.apply(this,args);
				});
			}
		}
		var event = new EventModel();
		event.on('play',function(options){
			console.log('现在播放的节目是: ' + options.name);
		});
		event.trigger('play',{name: '中国新歌声'});
```

####The Factory Pattern(工厂模式)

```js
		function People(options){
			this.name = options.name || '无名';
			this.age = options.age || 0;
		}

		People.prototype.sayHi = function(){
			console.log('hi i am ' + this.name);
		}

		function Man(options){
			People.call(this,options); //继承他的属性
			this.sex = '男';
		}

		//原型继承
		Man.prototype = Object.create(People.prototype);
		Man.prototype.constructor = Man;

		function Woman(options){
			People.call(this.options);
			this.sex = "女";
		}

		Woman.prototype = Object.create(People.prototype);
		Woman.prototype.constructor = Woman;

		function PeopleFactory(){}

		PeopleFactory.prototype.createPeople = function(options){
			switch(options.type){
				case 'man':
					this.people = Man;
					break;
				case 'women':
					this.people = Women;
					break;
				default:
					this.people = Man;		
			}

			return new this.people(options);
		};


		var peopleFactory = new PeopleFactory();

		var xiaoyun = peopleFactory.createPeople({
			type: 'man',
			name: 'daiqingyun',
			age: '23'
		});

		console.log(xiaoyun instanceof Man); //true
		xiaoyun.sayHi();//hi i am daiqingyun
```





