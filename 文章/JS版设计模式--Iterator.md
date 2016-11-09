###迭代模式(Iterator)
```js
  var Iterator = function () {
    var data = [1,2,3,4,5],
        index = 0,
        length = data.length;
    return {
      hasNext: function () {
        return index < length;
      },
      next: function () {
        var element = data[index];
        index += 1;
        return element;
      },
      rewind: function () {
        index = 0;
        return true;
      },
      current: function () {
        return data[index < length ? index : length - 1];
      }
    }
  }

  var it = Iterator();
  while (it.hasNext()) {
    console.log(it.next()); // 1,2,3,4,5
  }
  it.rewind();
  console.log(it.current()); // 1
```

###顺便一提
```js
  我们经常会用for循环遍历数组

  var arr = [1,2,3,4,5],
      i,
      max;
  for(i = 0, max = arr.length; i < max; i++) {
    if(i === 2) {
      // 在for循环中可以使用break或者continue
    }
    console.log(arr[i]);
  }

  ES5中又加入了 forEach(function (value, item, array) {});
  在这个里面就不可以用break了。

  可能有些同学会用forin 来遍历数组。千万不要那样做：
  1、得到的index类型为string，如果你要对index进行计算就可能出错。
  2、可能会遍历原型链上的属性（要使用hasOwnProperty()）
  3、顺序可能被改变。
```
