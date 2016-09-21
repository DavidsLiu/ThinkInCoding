/*

    散列开链法 主要通过二维数组来解决碰撞的问题。

*/

function HashTable() {
    this.table = new Array(137);
}
HashTable.prototype.buildChains = function() {
    var len = this.table.length;
    for(var i = 0; i < len;i++) {
        this.table[i] = new Array();
    }
}
HashTable.prototype.simpleHash = function(data) {
    var total = 0;
    var len = data.length;
    for(var i = 0; i < len;i++) {
        total += data.charCodeAt(i);
    }
    return total % this.table.length;
}
HashTable.prototype.put = function(data) {
    var poi = this.simpleHash(data);
    var index = 0;
    if(this.table[poi][index] === undefined) {
        this.table[poi][index] = data;
    }
    else {
        while (this.table[poi][index] !== undefined) {
            index++;
        }
        this.table[poi][index] = data;
    }
}
HashTable.prototype.show = function() {
    var len = this.table.length;
    for(var i = 0; i < len; i++) {
        var index = 0;
        while(this.table[i][index] !== undefined) {
            console.log(i + '   ' + this.table[i][index]);
            index++;
        }

    }
}
var hashtable = new HashTable();
hashtable.buildChains();
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
