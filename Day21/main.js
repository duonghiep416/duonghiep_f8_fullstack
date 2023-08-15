// Bài 1:
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự",
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email",
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại",
    },
};

Object.prototype.getMessageError = function (field) {
    var messageArr = Object.keys(this[field]);
    return this[field][messageArr[0]];
};

function getError(field) {
    return errors.getMessageError(field);
}

console.log(getError("name")); // Vui lòng nhập họ tên
console.log(getError("email")); // Định dạng email không hợp lệ
console.log(getError("password")); // Vui lòng nhập mật khẩu

// Bài 2
// Viết một hàm tạo (Constructor) để khởi tạo ra một đối tượng có 3 thuộc tính: name, age và address.

// Sau đó viết một hàm nhận vào một mảng chứa nhiều đối tượng để khởi tạo ra một mảng mới chứa các đối tượng có cấu trúc như trên.

// Kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng.

function Person(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
}

function createCustomers(customerList) {
    var newArray = customerList.map(function (customer) {
        var firstName = customer.name.slice(0, customer.name.indexOf(" "));
        var lastName = customer.name.slice(customer.name.lastIndexOf(" ") + 1);
        var user = new Person(
            `${customer.name}`,
            customer.age,
            `${customer.address}`
        );
        user.shortName = `${firstName} ${lastName}`;
        return user;
    });
    newArray.sort(function (a, b) {
        if (a.age < b.age) return -1;
    });
    return newArray;
}

const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];
const result = createCustomers(customers);
console.log(result);

// Bài 3

function User(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
}

function handleRegister() {
    const data = [];

    function pushUser(name, password, email) {
        if (!name && !password && !email) return data;
        if (!name || !password || !email) return "Bạn chưa nhập đủ các trường";
        var newUser = new User(name, password, email);
        newUser.role = "user";
        if (data.length === 0) {
            data.push(newUser);
        } else {
            for (var i = 0; i < data.length; i++) {
                if (data[i].email === email)
                    return "Địa chỉ email đã được sử dụng";
            }
            data.push(newUser);
        }
        return data;
    }
    return pushUser;
}
const addUser = handleRegister();
console.log(addUser("Nguyen Van A", "123456", "nguyenvana@email.com"));
console.log(addUser("Nguyen Van B", "123456", "nguyenvanb@email.com"));
// console.log(addUser("Nguyen Van B", "123456", "nguyenvanb@email.com"));
function handleLogin(email, password) {
    var dataLogin = addUser().filter(function (user) {
        return user.email === email && user.password === password;
    });
    if (dataLogin.length === 0) return "Thông tin đăng nhập không hợp lệ";
    return dataLogin;
}
console.log(handleLogin("nguyenvanb@email.com", "123456"));
