// Bài 1
// Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí

function findMinMax(arr) {
    if (!Array.isArray(arr)) return "Input is not an array";
    var min = arr[0],
        max = arr[0],
        indexMax,
        indexMin;
    for (var i in arr) {
        if (arr[i] >= max) {
            max = arr[i];
            indexMax = i;
        }
        if (arr[i] <= min) {
            min = arr[i];
            indexMin = i;
        }
    }
    return `Số lớn nhất là: ${max}, index: ${indexMax}. Số nhỏ nhất là: ${min}, index: ${indexMin}.`;
}

console.log(findMinMax([4, 5, 1, 10, 9, 7]));

// Bài 2
// Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

function isPrime(n) {
    n = +n;
    if (n <= 1 || typeof n !== "number" || n % 1 !== 0) return false;
    for (var i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function avgPrimeOfArray(arr) {
    var arrPrime = [],
        avgPrime = 0;
    for (var i in arr) {
        if (isPrime(arr[i])) {
            arrPrime.push(arr[i]);
            avgPrime += arr[i];
        }
    }

    return (avgPrime /= arrPrime.length);
}

console.log(
    avgPrimeOfArray([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ])
);

// Bài 3
// Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý
function filterArray(arr) {
    if (arr.length === 0) return "Mảng rỗng";
    var newArray = [];
    for (var i in arr) {
        if (!newArray.includes(arr[i])) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

console.log(filterArray(array));

// Bài 4
// Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau
// Sắp xếp mảng theo thứ tự tăng dần
// Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

function sortArray(arr, addElement) {
    arr.sort((a, b) => a - b);
    var indexAdd = 0;
    if (addElement > arr[arr.length - 1]) {
        arr.push(addElement);
        return arr;
    }
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] < addElement && arr[i + 1] >= addElement) {
            indexAdd = i + 1;
            break;
        }
    }
    arr.splice(indexAdd, 0, addElement);
    return arr;
}

var numbers = [2, 1, 3, 9, 8, 10];
var element = 3;
console.log(sortArray(numbers, element));
