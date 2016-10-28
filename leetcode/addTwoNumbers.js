/*
  You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

  Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
  Output: 7 -> 0 -> 8
*/

/*
    题目的大意是两个用链表存储的数（反向的）得到他们的和 输出也是一个链表
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

//定义链表
function ListNode(val){
  this.val = val;
  this.next = null;
}

//插入操作
function insert(str) {
  var nums = str.split('').reverse();
  var len = nums.length;
  var result = nums.map(function(item){
    return new ListNode(parseInt(item));
  });
  for(var i = 0; i < len - 1;i++) {
    result[i].next = result[i + 1];
  }

  return result[0];
}

var a = insert("5");
var b = insert("5");

var addTwoNumbers = function(l1, l2) {

  var a;
  var b;
  var carry = 0;
  var result = null;
  var temp = null;
  var t = new ListNode(0);
  while(l1 !== null || l2 !== null || carry != 0) {
    a = l1 === null ? 0 : l1.val;
    b = l2 === null ? 0 : l2.val;
    var tempSum = carry + a + b;
    carry = tempSum > 9 ? 1 : 0;
    var node = new ListNode(tempSum % 10);
    if(!result) {
      result = temp = node;
    }
    else {
      temp.next = node;
      temp = temp.next;
    }
    if(l1 !== null) {
      l1 = l1.next;
    }
    if(l2 !== null) {
      l2 = l2.next;
    }
  }
  return result;
};

var some = addTwoNumbers(a,b);
console.log(some);
