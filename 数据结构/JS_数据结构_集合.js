

/*

    集合:
    1、contain: 判断一个元素是否在集合中。
    2、add: 向集合中添加元素。
    3、remove: 从集合中删除元素。
    4、union(set) : 并集
    5、intersect(set) : 交集
    6、difference(set) : 补集
    7、subset(set) : 子集
*/

function Set() {
    this.table = [];
}


Set.prototype.contain = function(data) {
    var index = this.table.indexOf(data);
    if(index < 0) {
        return false;
    }
    else {
        return index;
    }
}

Set.prototype.add = function(data) {
    var typeString = getType(data);
    //基本类型
    if(typeString === 'number' || typeString === 'string' || typeString === "undefined" || typeString === 'boolean' || typeString === "null") {
        var flag = this.contain(data);
        if(flag === false) {
            this.table.push(data);
        }
    }
    //对象
    else if(typeString === "object") {

    }
}
Set.prototype.remove = function(data) {
    var typeString = getType(data);
    if(typeString === 'number' || typeString === 'string' || typeString === "undefined" || typeString === 'boolean' || typeString === "null") {
        //基本类型
        var flag = this.contain(data);
        if(flag !== false) {
            this.table.splice(flag, 1);
        }
    }
}

Set.prototype.union = function(set) {
    var len = set.table.length;
    var newSet = new Set();
    for(var i = 0; i < len ; i++) {
        newSet.add(set.table[i]);
    }
    len = this.table.length;
    for(var i = 0; i < len; i++) {

        newSet.add(this.table[i]);
    }
    return newSet;
}
Set.prototype.intersect = function(set){
    var len = set.table.length;
    var result = new Set();
    for(var i = 0; i < len; i++) {
        var temp = set.table[i];
        var flag = this.contain(temp);
        if(flag !== false) {
            result.add(temp);
        }
    }
    return result;
}
Set.prototype.difference = function(set) {
    var result = new Set();
    var len = this.table.length;
    for(var i = 0; i < len; i++) {
        var temp = this.table[i];
        var flag = set.contain(temp);
        if(flag === false) {
            result.table.push(temp);
        }
    }
    return result;
}
Set.prototype.subset = function(set) {
    var result = true;
    var len = set.table.length;
    for(var i = 0; i < len ; i++) {
        var flag = this.contain(set.table[i]);
        if(flag === false) {
            result = false;
        }
    }
    return result;
}

Set.prototype.show = function() {
    var len = this.table.length;
    for(var i = 0; i < len; i++) {
        console.log(this.table[i]);
    }
}

var set = new Set();

set.add(1);
set.add(2);
set.add(3);

var set1 = new Set();
set1.add(2);
set1.add(3);
set1.add(4);










function getType(data) {
    var str = Object.prototype.toString.call(data);
    var result = null;
    switch (str) {
        case '[object Number]':
            result = "number";
            break;
        case '[object String]':
            result = 'string';
            break;
        case '[object Undefined]':
            result = 'undefined';
            break;
        case '[object Null]':
            result = 'null';
            break;
        case '[object Boolean]':
            result = "boolean";
            break;
        case '[object Object]':
            result = 'object';
            break;
        case '[object Array]':
            result = 'array';
            break;
        case '[object Function]':
            result = 'function';
            break;
    }

    return result;

}


function copy(data) {
    var typeString = getType(data);
    var result;
    if(typeString === 'array') {
        result = [];
        var len = data.length;
        for(var i = 0; i < len; i++) {
            result.push(data[i]);
        }
    }

    return result;
}
