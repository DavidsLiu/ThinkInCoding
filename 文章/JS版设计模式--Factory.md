###工厂模式(Factory)
```js
  工厂模式一般分为3种：简单工厂、工厂方法和抽象工厂。
  很少能用到抽象工厂，除非是大型项目（我也没有用过，这里就不讨论了^_^）
  概念大家可以百度一下，今天我要给大家介绍的是工厂方法模式
```
###实现
```js
  这里我们通过一个生产汽车的车间为例：

  //车间
  function CarMaker(){};

  //车的基本功能
  CarMaker.prototype.config = function () {
    console.log('i have ' + this.doors + ' doors');
  }

  //生产车的方法
  CarMaker.factory = function (type) {
    var newcar;
    //判断车间里有没有生产这种类型车的技术
    if(typeof CarMaker[type] !== 'function') {
      console.log('我们不生产这种类型的车');
      return;
    }
    //该类型的车第一次生产时，要指定车的基本功能
    //（这里也就是继承原型链）
    if(typeof CarMaker[type].prototype.config !== 'function') {
      CarMaker[type].prototype = new CarMaker();
    }
    //创建实例
    newcar = new CarMaker[type]();
    return newcar;
  }
  //生产各种类型车辆的方法
  CarMaker.Compact = function () {
    this.doors = 4;
  }
  CarMaker.Convertible = function () {
    this.doors = 2;
  }
  CarMaker.SUV = function () {
    this.doors = 24;
  }

  var suv = CarMaker.factory('SUV');
  suv.config(); // 'i have 24 doors'

```

```js
  工厂方法的好处：
  1、添加新的车型时，不需要更改factory方法。
  2、将new关键字放入factory, 避免实例化对象的时候使用new。
```
