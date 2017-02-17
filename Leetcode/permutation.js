
/**
 * [1,2,3]
 *
 *  1
 *
 *  1 2
 *  2 1
 *
 *  3 1 2
 *  1 3 2
 *  1 2 3
 *  3 2 1
 *  2 3 1
 *  2 1 3
 *
 */

/**
 * Permutations
 * Given a collection of distinct numbers, return all possible permutations.
 */

function permute (nums) {
  var result = [];
  if (nums.length === 1) {
    result.push(nums);
    return result;
  }

  //递归公式
  var index = nums.pop(),
      next = permute(nums);

  for (var i = 0; i < next.length; i++) {
    for (var j = 0; j <= next[i].length; j++) {
      var temp = Object.assign([],next[i]);
      temp.splice(j,0,index);
      result.push(temp);
    }
  }
  return result;
}

export default permute;
