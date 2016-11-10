###装饰者模式(Decorator)
```
  优点：
    1、扩展功能，相对于继承增加了更多的灵活性。
    2、通过使用不得装饰器，以及它们的排列组合，创造出更多的可能性。

```

###第一种实现方式
```js
  ----------------------
    构造器静态属性 + 继承
  ----------------------

  function Coder() {
    this.skills = ['read'];
  }
  Coder.prototype.skill = function () {
    return this.skills;
  }
  Coder.decorators = {};
  Coder.decorators.js = {
    skill: function () {
      var skills = this.uber.skill();
      skills.push('JS');
      return skills;
    }
  }
  Coder.decorators.html = {
    skill: function () {
      var skills = this.uber.skill();
      skills.push('HTML5');
      return skills;
    }
  }
  Coder.decorators.css = {
    skill: function () {
      var skills = this.uber.skill();
      skills.push('CSS3');
      return skills;
    }
  }

  Coder.prototype.decorate = function (decorator) {
    var F = function () {},
        overrides = this.constructor.decorators[decorator],
        i,
        newobj;

    F.prototype = this;
    newobj = new F();
    newobj.uber = this;

    for (i in overrides) {
      if (overrides.hasOwnProperty(i)) {
        newobj[i] = overrides[i];
      }
    }

    return newobj;
  }
  var xiaoming = new Coder();
  console.log(xiaoming.skill()); // ["read"]
  xiaoming = xiaoming.decorate('js');
  xiaoming = xiaoming.decorate('css');
  xiaoming = xiaoming.decorate('html');
  console.log(xiaoming.skill()); // ["read", "JS", "CSS3", "HTML5"]

  从上面的代码中我们可以发现：
  1、每次采用装饰器时，实际上是返回了一个新的对象。
```

###第二种实现方式
```js
  ------------------
    不采用继承的方法
  ------------------

  function Coder() {
    this.skills = ['read'];
    this.decorator_list = [];
  }
  Coder.decorators = {};
  Coder.decorators.js = {
    skill: function (skills) {
      var result = skills;
      result.push('JS');
      return result;
    }
  }
  Coder.decorators.css = {
    skill: function (skills) {
      var result = skills;
      result.push('CSS3');
      return result;
    }
  }
  Coder.decorators.html = {
    skill: function (skills) {
      var result = skills;
      result.push('HTML5');
      return result;
    }
  }

  Coder.prototype.decorate = function (decorator) {
    this.decorator_list.push(decorator);
  }

  Coder.prototype.skill = function () {
    var skills = this.skills,
        i,
        max = this.decorator_list.length,
        name;

    for (i = 0; i < max; i++) {
      name = this.decorator_list[i];
      skills = Coder.decorators[name].skill(skills);
    }

    return skills;
  }


  var xiaoming = new Coder();
  console.log(xiaoming.skill()); // ["read"]
  xiaoming.decorate('js');
  xiaoming.decorate('css');
  xiaoming.decorate('html');
  console.log(xiaoming.skill()); // ["read", "JS", "CSS3", "HTML5"]  

  这样是不是更简单一些。
```
