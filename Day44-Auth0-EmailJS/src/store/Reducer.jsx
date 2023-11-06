const initState = {
    loading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "loading/switch":
            return {
                ...state,
                loading: action.payload,
            };
    }
}

export { initState };
export default reducer;
