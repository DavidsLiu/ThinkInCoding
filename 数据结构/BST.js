//BST的一个用途 就是记录数据出现的次数

//树的节点
function Node(data,left,right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

function BST() {
    this.root = null;
}

BST.prototype.insert = function(data) {
    var newNode = new Node(data, null, null);
    if(this.root === null) {
        this.root = newNode;
    }
    else {
        var currentNode = this.root;
        var parent;
        while(true) {
            parent = currentNode;
            if(data < currentNode.data) {
                currentNode = currentNode.left;
                if(currentNode === null) {
                    parent.left = newNode;
                    break;
                }
            }
            else {
                currentNode = currentNode.right;
                if(currentNode === null) {
                    parent.right = newNode;
                    break;
                }
            }
        }
    }
}

//中序遍历 得到的是一个升序序列
BST.prototype.inOrder = function(node) {
    if(node != null) {
        this.inOrder(node.left);
        console.log(node.data);
        this.inOrder(node.right);
    }
}

//先序遍历
BST.prototype.preOrder = function(node) {
    if(node != null) {
        console.log(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
}
//后序
BST.prototype.nextOrder = function(node) {
    if(node != null) {
        this.nextOrder(node.left);
        this.nextOrder(node.right);
        console.log(node.data);
    }
}

//查找最小值
BST.prototype.getMin = function() {
    var current = this.root;
    while(current.left != null) {
        current = current.left;
    }
    return current.data;
}

//查找最大值
BST.prototype.getMax = function() {
    var current = this.root;
    while(current.right != null) {
        current = current.right;
    }
    return current.data;
}

//查找定制
BST.prototype.find = function(data) {
    var current = this.root;
    while (current != null) {
        if(current.data == data) {
            return current;
        }
        else if(data > current.data) {
            current = current.right;
        }
        else {
            current = current.left;
        }
    }
    return null;
}
//删除节点


var bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
