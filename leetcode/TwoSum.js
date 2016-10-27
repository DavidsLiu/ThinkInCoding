/*
  Given nums = [2, 7, 11, 15], target = 9,

  Because nums[0] + nums[1] = 2 + 7 = 9,
  return [0, 1].
*/

/*
  题目的大意是： 从数组中找出两个数的和恰好是target，返回由这两个数组成的数组，并且这是数组是从小到大的顺序
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 //暴力求解
var twoSum = function(nums, target) {
  var len = nums.length;
  for(var i = 0; i < len; i++) {
    for(var j = i + 1; j < len; j++) {
      if(nums[i] + nums[j] === target) {
        return [i,j];
      }
    }
  }
};

//使用map
var twoSum = function(nums, target) {
  var len = nums.length;
  var hash = {};
  nums.map(function(item,index){
    hash[item] = index;
  });

  for(var i = 0;i < len; i++) {
    var temp = target - nums[i];
    if(hash[temp]) {
      return [i,hash[temp]];
    }
  }
};
