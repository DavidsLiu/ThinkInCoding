/*
    线性探测法： 基于一个散列有很多空的位置保存元素
*/
function HashTable() {
    this.table = new Array(137);
}
HashTable.prototype.simpleHash = function(key) {
    var len = key.length;
    var total = 0;
    for(var i = 0; i < len; i++){
        total += key.charCodeAt(i);
    }
    return total % this.table.length;
}
HashTable.prototype.put = function(key) {
    var poi = this.simpleHash(key);
    if(this.table[poi] === undefined) {
        this.table[poi] = key;
    }
    else {
        while(this.table[poi] !== undefined) {
            poi++;
        }
        this.table[poi] = key;
    }
}
HashTable.prototype.show = function() {
    var len = this.table.length;
    for(var i = 0;i < len;i++) {
        if(this.table[i] !== undefined) {
            console.log(i + '   ' + this.table[i]);
        }
    }
}

var hashtable = new HashTable();
hashtable.put('David');
hashtable.put('Jennifer');
hashtable.put('Donnie');
hashtable.put('Raymond');
hashtable.put('Cynthia');
hashtable.put('Mike');
hashtable.put('Clayton');
hashtable.put('Danny');
hashtable.put('Jonathan');
hashtable.show();
