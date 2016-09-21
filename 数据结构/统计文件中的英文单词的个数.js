var fs = require('fs');

/*
    3. 读取一个文本文件,使用散列显示该文件中出现的单词和它们在文件中出现的次数。
*/


fs.readFile('链式调用.html','utf-8',function(err, data) {
    if(err) {
        console.log(err);
    }
    else {
        var wordArray = getWordFromString(data);
        var len = wordArray.length;
        var list = new HashTable();
        for(var i = 0; i < len; i++) {
            list.put(wordArray[i]);
        }
        list.show();

    }
});

function getWordFromString(str) {
    var len = str.length;
    var result = str.match(/[a-z]+/gi);
    return result;
}

// 散列

function HashTable() {
    this.table = new Array(137);
}

HashTable.prototype.simpleHash = function(key) {
    var total = 0;
    var len = key.length;
    for(var i = 0 ; i < len; i++) {
        total += key.charCodeAt(i);
    }
    return total % this.table.length;
}

HashTable.prototype.put = function(key) {
    var poi = this.simpleHash(key);
    if(this.table[poi] === undefined) {
        this.table[poi] = {
            item: key,
            count: 1
        }
    }
    else {
        var flag = true;
        while(this.table[poi] !== undefined && flag) {
            if(this.table[poi].item === key) {
                this.table[poi].count += 1;
                flag = false;
            }
            else {
                poi += 1;
            }
        }
        if(flag) {
            this.table[poi] = {
                item: key,
                count: 1
            }
        }
    }
}

HashTable.prototype.show = function() {
    var len = this.table.length;
    for(var i = 0; i < len; i++) {
        if(this.table[i] !== undefined) {
            console.log(this.table[i].item + '   ' + this.table[i].count);
        }
    }
}
