const decreaseProductCart = (id, dispatch) => {
    dispatch({
        type: "cart/decrease",
        payload: id,
    });
};

const increaseProductCart = (id, dispatch) => {
    dispatch({
        type: "cart/increase",
        payload: id,
    });
};

const removeProductCart = (id, dispatch) => {
    dispatch({
        type: "cart/remove",
        payload: id,
    });
};

export { decreaseProductCart, increaseProductCart, removeProductCart };
