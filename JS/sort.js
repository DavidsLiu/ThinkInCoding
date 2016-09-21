var arr = [2,54,3,32,43,56,12,34,678,34,55,22,11,4,7,8,323];

/*
    Bubble sortO(n2)
*/

function bubbleSort(arr) {
    var count = 0;
    var len = arr.length;
    for(var i = 0; i < len;i++) { //比较的次数
        for(var j = 0;j < len - 1 - i;j++) { //冒泡的过程
            count++;
            console.log(count);
            if(arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

/*
    改进的冒泡 记录每趟交换的最后一个位置O(n2)
*/

function betterBubbleSort(arr) {
    var i = arr.length - 1;
    while(i > 0) {
        var pos = 0;
        for(var j = 0; j < i; j++) {
            if(arr[j] > arr[j + 1]) {
                pos = j;
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }

    return arr;
}

/*
    传统的冒泡一趟只找一个最大值或者最小值， O(n2)
*/
function bestBubbleSort() {
    var low = 0;
    var high = arr.length - 1;
    var poi = 0;
    var temp , j;
    while(low < high) {
        //正向找出最大值
        for(j = low; j < high; j++) {
            if(arr[j] > arr[j + 1]) {
                poi = j;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        high = poi;
        //反向找出最小值
        for(j = high; j > low ; j--) {
            if(arr[j] < arr[j - 1]) {
                poi = j;
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
        low = poi;


    }
    return arr;
}

/*
    选择排序 比较的稳定 用到它的时候，数据规模越小越好，不用占据额外空间 O(n2)
*/

function selectionSort(arr) {
    var len = arr.length;
    var maxIndex, temp;
    for(var i = 0; i < len - 1; i++) {
        maxIndex = i;
        for(var j = i + 1; j < len;j++) {
            if(arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[maxIndex];
        arr[maxIndex] = temp;
    }

    return arr;
}


/*
    插入排序 采用O(1)的额外空间 in-place排序 O(n2)
*/
function insertionSort(arr) {
    var len = arr.length;
    for(var i = 1; i < len - 1; i++) {
        var key = arr[i];
        var j = i - 1;
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}

/*
    插入排序的改良  采用二分法查找 O(n2)
*/

function binaryInsertionSort(arr) {
    var len = arr.length;
    for(var i = 1; i < len ; i++) {
        var key = arr[i];
        var left = 0;
        var right = i - 1;
        while(left <= right) {
            var middle = parseInt((left + right) / 2);
            if(key > arr[middle]) {
                left = middle + 1;
            }
            else {
                right = middle - 1;
            }
        }
        for(var j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}

/*
    希尔排序   第一个突破O(n2)的排序算法 O(nlog n)
*/


/*
    快速排序 处理大数据最快的排序算法之一
*/

function quickSort(arr, left, right) {
    if(left < right) {
        var x = arr[right];
        var temp;
        var i = left - 1;
        for(var j = left; j <= right; j++) {
            if(arr[j] <= x) {
                i++;
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        quickSort(arr, left , i - 1);
        quickSort(arr, i + 1, right);
    }

    return arr;
}

/*
    堆排序
*/

function heapSort(arr) {
    var heapSize = arr.length;
    var temp;
    //建队
    for(var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(arr,i,heapSize);
    }
    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
        temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;
        heapify(arr, 0, --heapSize);
    }
    return arr;


}

//堆
function heapify(arr, x, len) {
    var l = 2 * x + 1;
    var r = 2 * x + 2;
    var largest = x;
    var temp;
    if(l < len && arr[l] > arr[largest]) {
        largest = l;
    }
    if(r < len && arr[r] > arr[largest]) {
        largest = r;
    }
    if(largest != x) {
        temp = arr[x];
        arr[x] = arr[largest];
        arr[largest] = temp;
        heapify(arr, largest, len);
    }
}
console.log(heapSort(arr));
