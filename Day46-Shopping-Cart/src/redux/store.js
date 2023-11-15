import { legacy_createStore as createStore } from 'redux'
const initState = {
  productsCart: localStorage.getItem('productsCart')
    ? JSON.parse(localStorage.getItem('productsCart'))
    : [],
  loading: false
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'cart/add': {
      const products = filterLatestProducts([
        ...state.productsCart,
        action.payload
      ])
      localStorage.setItem('productsCart', JSON.stringify(products))
      return { ...state, productsCart: products }
    }
    case 'cart/decreaseProduct': {
      localStorage.setItem(
        'productsCart',
        JSON.stringify([...action.payload.products])
      )
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/increaseProduct': {
      localStorage.setItem(
        'productsCart',
        JSON.stringify([...action.payload.products])
      )
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/removeProduct': {
      localStorage.setItem(
        'productsCart',
        JSON.stringify([...action.payload.products])
      )
      return { ...state, productsCart: [...action.payload.products] }
    }
    case 'cart/clear': {
      localStorage.removeItem('productsCart')
      return { ...state, productsCart: [] }
    }
    case 'loading/switch': {
      return { ...state, loading: action.payload }
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
