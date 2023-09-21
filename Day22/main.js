// Bài 1
// Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter

// Yêu cầu chi tiết:

// Hàm return về giá trị
// Ép ràng buộc kiểu dữ liệu là số
// Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi

function getSum(...args) {
    var isNumber = args.every(
        (number) =>
            !isNaN(+number) &&
            +number !== Infinity &&
            typeof +number === "number"
    );
    for (var i in args) {
        args[i] = +args[i];
    }
    if (isNumber) {
        var total = args.reduce((previous, current) => previous + current);
    } else {
        return "Không hợp lệ";
    }
    return total;
}
console.log(getSum(5, "-10.5", 20, 30, 15));

// Bài 2
// Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị
// Kết quả sẽ hiển thị ra kết định dạng kèm đơn vị tiền tệ

Object.prototype.getCurrency = function (unit) {
    var number = this;
    if (
        !isNaN(+number) &&
        +number !== Infinity &&
        typeof +number === "number"
    ) {
        number = +this;
    } else {
        return "Không hợp lệ";
    }
    return number.toLocaleString("en-US") + " " + unit;
};
var price = 10000000;
console.log(price.getCurrency("đ"));

// Bài 3
var data = [
    {
        id: 1,
        name: "Chuyên mục 1",
        parent: 0,
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        parent: 0,
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        parent: 0,
    },
    {
        id: 4,
        name: "Chuyên mục 2.1",
        parent: 2,
    },
    {
        id: 5,
        name: "Chuyên mục 2.2",
        parent: 2,
    },
    {
        id: 6,
        name: "Chuyên mục 2.3",
        parent: 2,
    },
    {
        id: 7,
        name: "Chuyên mục 3.1",
        parent: 3,
    },
    {
        id: 8,
        name: "Chuyên mục 3.2",
        parent: 3,
    },
    {
        id: 9,
        name: "Chuyên mục 3.3",
        parent: 3,
    },
    {
        id: 10,
        name: "Chuyên mục 2.2.1",
        parent: 5,
    },
    {
        id: 11,
        name: "Chuyên mục 2.2.2",
        parent: 5,
    },
    {
        id: 12,
        name: "Chuyên mục 2.2.2.1",
        parent: 11,
    },
];

function convertToNestedArray(data) {
    var result = [];

    data.forEach(function (item) {
        item.children = [];
        if (item.parent === 0) {
            result.push(item);
        } else {
            var parentCategory = data.find(function (category) {
                return category.id === item.parent;
            });

            if (parentCategory) {
                parentCategory.children.push(item);
            }
        }
        delete item.parent;
    });
    return result;
}

var categories = convertToNestedArray(data);
console.log(categories);

// Bài 4
Array.prototype.reduce2 = function (callback, result) {
    var i = 0;
    if (arguments.length < 2) {
        result = this[0];
        i = 1;
    }
    var arrLength = this.length;
    for (; i < arrLength; i++) {
        result = callback(result, this[i], i, this);
    }
    return result;
};

var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var result = arr.reduce2((prev, current) => {
    return prev + current;
}, 10);
console.log(result);
