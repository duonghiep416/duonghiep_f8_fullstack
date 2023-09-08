const tableProduct = document.getElementById("table-product");
const tableCart = document.getElementById("table-cart");
const products = [
    {
        id: 1,
        name: "Sản phẩm 1",
        price: 1000,
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        price: 2000,
    },
    {
        id: 3,
        name: "Sản phẩm 3",
        price: 3000,
    },
    {
        id: 4,
        name: "Sản phẩm 4",
        price: 4000,
    },
];

let carts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
function saveCartToLocalStorage() {
    localStorage.setItem("carts", JSON.stringify(carts));
}
let storedCarts = localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [];
function renderProduct() {
    products.forEach((product, index) => {
        const productItem = document.createElement("tr");
        productItem.classList.add(`product-item-${index}`);
        const html = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <input type="number" value="1" class="quantity-product"/>
                <button class="add-to-cart">Thêm vào giỏ</button>
            </td>`;
        productItem.innerHTML = html;
        tableProduct.appendChild(productItem);
    });
    const addBtn = document.querySelectorAll(".add-to-cart");
    const quantity = document.querySelectorAll(".quantity-product");
    addBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const productIds = carts.map((cart) => cart.product_id);
            const isProductDuplicate = productIds.includes(index + 1);
            if (isProductDuplicate) {
                const productDuplicate = carts.find(
                    (cart) => cart.product_id === index + 1
                );
                productDuplicate.quantity++;
                carts[carts.length - 1].total =
                    carts[carts.length - 1].quantity *
                    carts[carts.length - 1].price;
                renderCart();
            } else {
                carts.push({
                    id: carts.length + 1,
                    product_id: index + 1,
                    name: products[index].name,
                    price: products[index].price,
                    quantity: quantity[index].value,
                    total: 0,
                });
                carts[carts.length - 1].total =
                    carts[carts.length - 1].quantity *
                    carts[carts.length - 1].price;
                renderCart();
            }
            saveCartToLocalStorage();
            storedCarts = JSON.parse(localStorage.getItem("carts"));
            renderCart();
            handleCart();
        });
    });
}
renderProduct();

function renderCart() {
    if (carts.length === 0) {
        tableCart.innerHTML = "Bạn chưa thêm sản phẩm nào vào giỏ hàng";
        return;
    }
    const headerCart = `
        <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
        </tr>`;
    tableCart.innerHTML = headerCart;
    storedCarts.forEach((cart, index) => {
        const cartItem = document.createElement("tr");
        cartItem.classList.add(`cart-item-${index}`);
        const html = `
            <td>${cart.id}</td>
            <td>${cart.name}</td>
            <td>${cart.price}</td>
            <td>${cart.quantity}</td>
            <td>${cart.total}</td>
            <td>
                <button class="deleteItem">Xóa</button>
            </td>`;
        cartItem.innerHTML = html;
        tableCart.appendChild(cartItem);
    });
    const total = document.createElement("tr");
    total.innerHTML = `
    <td colspan="3">Tổng</td>
    <td>${storedCarts.reduce((total, cart) => total + +cart.quantity, 0)}</td>
    <td>${storedCarts.reduce((total, cart) => total + +cart.total, 0)}</td>
    `;
    tableCart.appendChild(total);
    const deleteBtn = document.querySelectorAll(".deleteItem");
    deleteBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (confirm("Are you sure?") === true) {
                carts.splice(index, 1);
                saveCartToLocalStorage();
                storedCarts = JSON.parse(localStorage.getItem("carts"));
                renderCart();
                handleCart();
            }
        });
    });
}
renderCart();

function handleCart() {
    const cartAction = document.querySelector(".cart-action");
    if (carts.length === 0) {
        cartAction.innerHTML = "";
        return;
    }
    const main = document.querySelector(".main");
    const html = `<button class="update-btn">Cập nhật giỏ hàng</button>
    <button class="delete-all-btn">Xóa giỏ hàng</button>`;
    cartAction.innerHTML = html;
    const updateBtn = document.querySelector(".update-btn");
    const deleteAllBtn = document.querySelector(".delete-all-btn");
    updateBtn.addEventListener("click", () => {
        alert("Cập nhật giỏ hàng thành công");
    });
    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure?") === true) {
            carts.length = 0;
            saveCartToLocalStorage();
            storedCarts = JSON.parse(localStorage.getItem("carts"));
            renderCart();
            alert("Xóa giỏ hàng thành công");
            cartAction.innerHTML = "";
        }
    });
}
handleCart();
