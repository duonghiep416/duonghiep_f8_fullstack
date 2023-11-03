const initState = {
    products: [],
    productsCart: [],
    loading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "products/updateProducts":
            return { ...state, products: action.payload };
        case "products/addCart":
            const products = filterLatestProducts([
                ...state.productsCart,
                action.payload,
            ]);
            return {
                ...state,
                productsCart: products,
            };
        case "product/makeEmpty":
            return {
                ...state,
                productsCart: [],
            };
        case "loading/switch":
            return {
                ...state,
                loading: !state.loading,
            };
    }
}

export { initState };
export default reducer;
function filterLatestProducts(products) {
    const latestProducts = {};

    for (const product of products) {
        const id = product.id;

        latestProducts[id] = product;
    }

    const filteredProducts = Object.values(latestProducts);

    return filteredProducts;
}
