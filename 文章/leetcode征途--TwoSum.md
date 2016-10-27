###leetcode
  如果你有一天发现你对前端没有兴趣了，你写两道leetcode上的题目，你就会乖乖回来继续码前端了。
  俗话说的好，不想当将军的士兵不是好士兵，如果你想成为厉害的前端，算法技能是必备的。（算法不应该是程序员的标配吗-_-!）。

####题目难度Easy(楼主算法比较的差，先从简单的开始^_^)
```
  /*
    Given nums = [2, 7, 11, 15], target = 9,
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].
    .....
  */

```

####中文题解
  能有个练习系统支持JS真的不容易，其实我做了两三道题，看了大家的执行时间才知道：JSer真的很低很低。。。。
  题目的大意从数组中找出两个数的和恰好是target（一组就行）,将这两个数的下标以数组的形式返回，并且是从小到大的顺序。

####暴力求解O(n2)
```js
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    var twoSum = function(nums, target) {
      var len = nums.length;
      for(var i = 0; i < len; i++) {
        for(var j = i + 1; j < len; j++) {
          if(nums[i] + nums[j] === target) {
            return [i,j];
          }
        }
      }
    }

    这应该没什么说的
```

####利用哈希表 O(n)
```js
  var twoSum = function(nums, target) {
    var len = nums.length;
    var hash = {};
    //首先把数据存到哈希结构中。
    nums.map(function(item,index){
      hash[item] = index;
    });

    for(var i = 0;i < len; i++) {
      //寻找另一个数
      var temp = target - nums[i];
      //这里利用哈希的特性,去掉了一层循环
      if(hash[temp]) {
        return [i,hash[temp]];
      }
    }
  };
```
