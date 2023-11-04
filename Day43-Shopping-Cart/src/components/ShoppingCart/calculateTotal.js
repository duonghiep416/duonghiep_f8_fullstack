const calculateTotal = (productsCart) => {
    if (productsCart.length === 0) {
        return { totalPrice: 0, totalQuantity: 0 };
    }
    const totalPrice = productsCart.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0);
    const totalQuantity = productsCart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);
    return { totalPrice, totalQuantity };
};
export default calculateTotal;
