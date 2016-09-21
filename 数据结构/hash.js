/*
    散列基于数组， 根据散列函数将键映射为一个数字 （碰撞的解决）
    对于字符的散列  每个字符的ASCII码相加 除以长度的余数。 ----》 尽量避免产生碰撞

*/

function HashTable() {
    this.table = new Array(151);
}
HashTable.prototype.simpleStringHash = function(data) {
    var total = 0;
    var h = 31;
    for(var i = 0; i < data.length;i++) {
        // 霍纳法则 每次乘以一个质数
        total += total * h + data.charCodeAt(i);
    }
    return total % this.table.length;
}
HashTable.prototype.put = function(data) {
    var pos = this.simpleStringHash(data);
    this.table[pos] = data;
}
HashTable.prototype.show = function() {
    var n = 0;
    for(var i = 0;i < this.table.length; i++) {
        if(this.table[i] !== undefined) {
            console.log(i + '  ' + this.table[i]);
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
