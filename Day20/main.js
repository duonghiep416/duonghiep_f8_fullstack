// Bài 1:
// Lấy kết quả giao giữa 2 mảng

function getDuplicateElements(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return "Không hợp lệ";
    var result = [];
    for (var i in arr1) {
        if (arr2.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }
    return result;
}

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
console.log(getDuplicateElements(arrA, arrB));

// Bài 2:
// Làm phẳng array sau (Chuyển về mảng 1 chiều)

function convertToSingleDimensionalArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        while (Array.isArray(arr[i])) {
            if (Array.isArray(arr[i])) {
                arr.splice(i, 1, ...arr[i]);
            }
        }
    }

    return arr;
}

// var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
// console.log(convertToSingleDimensionalArray(arr));

// Bài 3: Tách phần tử trong mảng theo đúng kiểu dữ liệu

function separateElementByDataType(arr) {
    var dimensionalArr = convertToSingleDimensionalArray(arr),
        arrLength = dimensionalArr.length,
        arrResult = [],
        numberArr = [],
        stringArr = [],
        booleanArr = [],
        objectArr = [],
        array = [],
        functionArr = [];
    dimensionalArr.forEach((element) => {
        switch (typeof element) {
            case "number":
                numberArr.push(element);
                break;
            case "string":
                stringArr.push(element);
                break;
            case "boolean":
                booleanArr.push(element);
                break;
            case "object":
                Array.isArray(element)
                    ? array.push(element)
                    : objectArr.push(element);
                break;
            case "function":
                functionArr.push(element);
                break;
        }
    });
    arrResult.push(numberArr, stringArr, booleanArr, objectArr, functionArr);
    arrResult = arrResult.filter((n) => n.length > 0);
    return arrResult;
}
var arr = [
    ["a", 1, true],
    ["b", 2, false],
    [{ name: "Hiep", address: "Ha Noi" }, () => console.log("Hello")],
    [{ name: "Duong", address: "Ha Noi" }, () => console.log("Hé lô")],
];
console.log(separateElementByDataType(arr));

// Bài 4

function renderPosts(data) {
    for (var i in data) {
        if (i % 2 === 0)
            document.write(
                `<div class="post-item">
                    <img src="${data[i].img}" alt="img-1" class="main-img" />
                    <div class="post-content">
                        <h2 class="post-title">${data[i].title}</h2>
                        <p class="post-desc">
                        ${data[i].desc}
                        </p>
                    </div>
                </div>`
            );
        else {
            document.write(
                `<div class="post-item">
                    <div class="post-content">
                        <h2 class="post-title">${data[i].title}</h2>
                        <p class="post-desc">
                        ${data[i].desc}
                        </p>
                    </div>
                    <img src="${data[i].img}" alt="img-1" class="main-img" />
                </div>`
            );
        }
    }
}
var data = [
    {
        title: "Tiêu đề bài viết 1",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro.",
        img: "./img-1.jpg",
    },
    {
        title: "Tiêu đề bài viết 2",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro.",
        img: "./img-2.jpg",
    },
    {
        title: "Tiêu đề bài viết 3",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro.",
        img: "./img-3.jpg",
    },
    {
        title: "Tiêu đề bài viết 4",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro. similique consectetur hic porro. Cum quas error saepe aut earum quae consequatur similique consectetur hic porro.",
        img: "./img-4.jpg",
    },
];
renderPosts(data);
