import { legacy_createStore as createStore } from 'redux'
const initState = {
  productsCart: []
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'cart/add': {
      const products = filterLatestProducts([
        ...state.productsCart,
        action.payload
      ])
      return { ...state, productsCart: products }
    }
    case 'cart/decreaseProduct': {
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/increaseProduct': {
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/removeProduct': {
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/clear': {
      return { ...state, productsCart: [] }
    }
    default:
      return state
  }
}

export const store = createStore(rootReducer)
function filterLatestProducts(products) {
  const latestProducts = {}

  for (const product of products) {
    const id = product._id

    latestProducts[id] = product
  }

  const filteredProducts = Object.values(latestProducts)

  return filteredProducts
}
