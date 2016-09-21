/*
    循环链表
    节点类    Node
    链表类    LList
    方法:
        (1).添加insert(element, target) 同时要有一个find(target)
        (2).删除remove(element) 同时要有一个找到前节点的findPre(element)

*/

//节点类
function Node(element) {
    this.element = element;
    this.next = null;
}

//循环列表
function LList() {
    this.head = new Node('head');
    this.head.next = this.head;
}
LList.prototype.find = function(target) {
    var curNode = this.head;
    while(curNode.element != target && curNode.next != this.head) {
        curNode = curNode.next;
    }
    return curNode;
}
LList.prototype.insert = function(newElement, target) {
    var newNode = new Node(newElement);
    var curNode = this.find(target);
    newNode.next = curNode.next;
    curNode.next = newNode;
}
LList.prototype.findPre = function(element) {
    var curNode = this.head;
    while(curNode.next.element != element && curNode.next != null) {
        curNode = curNode.next;
    }
    return curNode;
}
LList.prototype.remove = function(element) {
    var preNode = this.findPre(element);
    preNode.next = preNode.next.next;
}

var list = new LList();
list.insert('1','head');
list.insert('2','1');
list.insert('4','2');
list.insert('3','2');
list.remove('2');
console.log(list);
