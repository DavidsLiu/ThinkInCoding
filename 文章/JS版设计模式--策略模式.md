###策略模式(Stragegy)

  策略模式：定义一系列的算法，并且把它们封装起来，而且他们可以相互替换。

###实现方法
  这里我举个在项目中遇到的问题，比如说要验证一个对象中的属性的值是否合法，一开始我是通过不停的else if，现在想想，真的有点蠢了。

```js
  var validator = {
    //验证的方法
    methods: {},
    //配置数据
    config: {},
    //错误信息
    messages: [],
    validate: function (data) {
      var i,
          value,
          flag,
          methodName;
      this.messages = [];

      for (i in data) {
        if (data.hasOwnProperty(i)) {
          methodName = validator.config[i];
          if(methodName) {
            //有配置的情况下
            flag = validator.methods[methodName].validate(data[i]);
            if(!flag) {
              this.messages.push(validator.methods[methodName].message);
            }
          }
        }
      }
    },
    hasError: function () {
      return this.messages.length > 0;
    }
  }
  validator.methods.isNum = {
    validate: function (data) {
      return (Object.prototype.toString.call(data) === "[object Number]");
    },
    message: "请输入数字！"
  }
  validator.methods.isPhone = {
    validate: function (data) {
      var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
      return reg.test(data);
    },
    message: '手机号码不正确!'
  }
  validator.methods.isEmail = {
    validate: function (data) {
      var reg = /\w@\w*\.\w/;
      return reg.test(data);
    },
    message: '邮箱地址不正确！'
  }


  var data = {
    name: 'dai',
    age: 12,
    sex: 0,
    phone: '15751165579',
    email: '15751165579@163.com'
  }

  validator.config = {
    age: "isNum",
    phone: 'isPhone',
    email: 'isEmail'
  }

  validator.validate(data);
  if (validator.hasError()) {
    console.log(validator.messages);
  }
  else {
    console.log("ok");
  }
```  
