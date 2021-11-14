var arr = [4, 7, 1, 3, 6, 9, 3, 5, 7, 9, 7, 9, 2, 4, 7, 0, 8, 4, 6];

function findCount(n) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr == n) {
            count++;
        } else {
            count--;
        }
    }
    return count;
}

var count=findCount(7);
print(count);