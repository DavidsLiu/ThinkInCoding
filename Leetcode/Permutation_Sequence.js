/**
 * The set [1,2,3,…,n] contains a total of n! unique permutations.
 */

/**
 *  康托展开
 *  1、[1,2,3,4,....,n]
 *  2、k - 1 相当于调用15次next_permutation
 *  例如求第16个n=5的序列
 *  1、 15 / 24 (4!) 得到的结果为0，余数为15 ，也就是找到0个数比它小的数，也就是1. 所以第一位是1. 然后在数组中去掉1.
 *  2、 15 / 6 (3!) 得到的结果为2，余数为3 也就是4 ，去掉4
 *  3、 3 / 2 (2!) 得到的结果为1 余数为1 也就是 3 去掉3
 *  4、 1 / 1 (1!) 得到的结果为1 余数为0 也就是 5 去掉5
 *  5、 得到结果为 1 4 3 5 2
 *
 *
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
  var arr = [],
      result = "";

  k = k - 1;
  for (var i = 0; i < n; i++) {
    arr.push(i + 1);
  }

  while (n > 1) {
    var temp = parseInt(k / ato(n - 1));
    result += arr[temp];
    arr.splice(temp,1);
    k = k % ato(n - 1);
    n--;
  }

  return result + arr[0];

  function ato(n) {
    var result = 1;
    for (var i = 0; i < n; i++) {
      result *= i + 1;
    }
    return result;
  }
};

export default getPermutation;
