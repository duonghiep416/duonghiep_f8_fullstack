// Bài 1: Hoán vị 2 số
// Input: Cho trước 2 số a, b
// Output: Thực hiện hoán vị 2 số không dùng biến trung gian

var a = 9,
    b = 5;

a += b; // a = 14
b = a - b; // b = 9
a = a - b; // a = 5

console.log(`a: ${a}, b: ${b}`); //a: 5, b: 9

// Bài 2: Thực hiện phép toán
// Viết chương trình tính toán biểu thức sau
// S = 10 + 20 + 5^10 / 2

var S = 10 + 20 + 5 ** 10 / 2;
console.log(S); // 4882842.5

// Bài 3: Tìm số lớn nhất
// Input:
// Cho trước 3 số a, b, c
// Output:
// Tìm số lớn nhất trong 3 số và hiển thị kết quả

var a = 10,
    b = 15,
    c = 8,
    biggestNumber = a;
if (b >= biggestNumber) {
    biggestNumber = b;
}
if (c >= biggestNumber) {
    biggestNumber = c;
}

console.log("biggestNumber: " + biggestNumber);

// Bài 4: Kiểm tra số cùng dấu
// Input:
// Cho trước 2 số a, b
// Output:
// Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình

var a = -2,
    b = 2;
if (a * b >= 0) {
    console.log(`a, b là 2 số cùng dấu`);
} else {
    console.log(`a, b là 2 số khác dấu`);
}

// Bài 5: Sắp xếp 3 số
// Input:
// Cho trước 3 số a, b, c
// Output:
// Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần

var a = 18,
    b = 180,
    c = 70,
    d;

if (a >= b) {
    d = a;
    a = b;
    b = d;
}
if (a >= c) {
    d = a;
    a = c;
    c = d;
}
if (b >= c) {
    d = b;
    b = c;
    c = d;
}

console.log(`Thứ tự tăng dần là: ${a}, ${b}, ${c}`);
