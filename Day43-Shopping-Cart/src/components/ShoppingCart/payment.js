import { toast } from "react-toastify";
import { handleLogic } from "../../assets/js/script";
import { checkProfile } from "../../assets/js/validateUser";

async function payment(state) {
    const checkValidatedResult = await checkProfile();

    if (!checkValidatedResult) {
        toast.error("Có lỗi xảy ra, vui lòng tải lại trang!");
    } else {
        const body = convertToPaymentArray(state.productsCart);
        const data = await handleLogic.postPayment(body);
        if (data.status_code === "SUCCESS") {
            toast.success("Thanh toán thành công!");
            return data;
        } else if (data.status_code === "FAILED") {
            toast.error("Có lỗi xảy ra, vui lòng tải lại trang!");
        }
    }
}

function impactProduct(products, id, action, state) {
    const newProduct = [...products];
    const productIndex = newProduct.findIndex((product) => product.id === id);
    switch (action) {
        case "increase":
            newProduct.splice(productIndex, 1, {
                ...newProduct[productIndex],
                quantity: newProduct[productIndex].quantity + 1,
                price:
                    (newProduct[productIndex].price /
                        newProduct[productIndex].quantity) *
                    (newProduct[productIndex].quantity + 1),
            });
            break;
        case "decrease":
            if (newProduct[productIndex].quantity === 1) {
                for (var i = 0; i < state.productsCart.length; i++) {
                    state.productsCart[i].setProduct({
                        quantity: 0,
                        price: 0,
                    });
                }
                newProduct.splice(productIndex, 1);
                break;
            }
            newProduct.splice(productIndex, 1, {
                ...newProduct[productIndex],
                quantity: newProduct[productIndex].quantity - 1,
                price:
                    (newProduct[productIndex].price /
                        newProduct[productIndex].quantity) *
                    (newProduct[productIndex].quantity - 1),
            });
            break;
        case "remove":
            for (var i = 0; i < state.productsCart.length; i++) {
                state.productsCart[i].setProduct({
                    quantity: 0,
                    price: 0,
                });
            }
            newProduct.splice(productIndex, 1);
            break;
    }

    return newProduct;
}

function filterLatestProducts(products) {
    const latestProducts = {};

    for (const product of products) {
        const id = product.id;

        latestProducts[id] = product;
    }

    const filteredProducts = Object.values(latestProducts);

    return filteredProducts;
}

function convertToPaymentArray(products) {
    var paymentArray = [];
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var paymentItem = {
            productId: product.id,
            quantity: product.quantity,
        };
        paymentArray.push(paymentItem);
    }
    return paymentArray;
}

export default payment;
export { impactProduct, filterLatestProducts };
