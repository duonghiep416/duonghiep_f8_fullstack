import {
    impactProduct,
    filterLatestProducts,
} from "../components/ShoppingCart/payment";

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
        case "cart/decrease":
            return {
                ...state,
                productsCart: impactProduct(
                    state.productsCart,
                    action.payload,
                    "decrease",
                    state
                ),
            };
        case "cart/increase":
            return {
                ...state,
                productsCart: impactProduct(
                    state.productsCart,
                    action.payload,
                    "increase",
                    state
                ),
            };
        case "cart/remove":
            return {
                ...state,
                productsCart: impactProduct(
                    state.productsCart,
                    action.payload,
                    "remove",
                    state
                ),
            };
    }
}

export { initState };
export default reducer;
