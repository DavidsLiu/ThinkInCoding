/*
    单向链表
    节点类    Node
    链表类    LList
    方法:
        (1).添加insert(element, target) 同时要有一个find(target)
        (2).删除remove(element) 同时要有一个找到前节点的findPre(element)
        (3).当前节点向前移动几个节点advance(n,element)
        (4).当前节点向后移动几个节点back(n,element)
*/

//节点类
function Node(element) {
    //链表的内容
    this.element = element;
    //后面的节点
    this.next = null;
}

//链表类
function LList() {
    //链表的头结点
    this.head = new Node('head');
}
LList.prototype.find = function(target){
    var curNode = this.head;
    while(curNode.element != target && curNode.next != null) {
        //后移
        curNode = curNode.next;
    }
    return curNode;
}
LList.prototype.insert = function(element,target) {
    var newNode = new Node(element);
    var curNode = this.find(target);
    //改变下一个节点的指向
    newNode.next = curNode.next;
    curNode.next = newNode;
}
LList.prototype.findPre = function(element) {
    var curNode = this.head;
    while (curNode.next != null && curNode.next.element != element) {
        curNode = curNode.next;
    }
    return curNode;
}
LList.prototype.remove = function(element) {
    var preNode = this.findPre(element);
    if(preNode.next != null) {
        preNode.next = preNode.next.next;
    }
}
LList.prototype.advance = function(n,element) {
    var curNode = this.find(element);
    var sum = n;
    while(sum > 0) {
        sum--;
        var preNode = this.findPre(element);
        var prepreNode = this.findPre(preNode.element);
        if(preNode === this.head) {
            sum = 0;
        }
        else {
            prepreNode.next = curNode;
            preNode.next = curNode.next;
            curNode.next = preNode;
        }
    }
}
LList.prototype.back = function(n, element){
    var sum = n;
    var curNode = this.find(element);
    while(curNode.next != null && sum > 0) {
        sum--;
        var preNode = this.findPre(curNode.element);
        preNode.next = curNode.next;
        curNode.next = curNode.next.next;
        preNode.next.next = curNode;
    }

}

var list = new LList();
list.insert('dai','head');
list.insert('chen','dai');
list.insert('fan','chen');
list.insert('xuan','fan');
console.log(list);
