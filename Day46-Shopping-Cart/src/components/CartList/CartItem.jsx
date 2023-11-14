import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button/Button'
// eslint-disable-next-line react/prop-types
function CartItem({ id, name, price, imgUrl, quantity }) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productsCart)
  const indexProduct = products.findIndex((product) => product._id === id)
  const handleDecrease = () => {
    if (quantity > 1) {
      products[indexProduct].price =
        (products[indexProduct].price / products[indexProduct].quantity) *
        --products[indexProduct].quantity
      dispatch({
        type: 'cart/decreaseProduct',
        payload: {
          products
        }
      })
    } else {
      handleRemove()
    }
  }
  const handleIncrease = () => {
    products[indexProduct].price =
      (products[indexProduct].price / products[indexProduct].quantity) *
      ++products[indexProduct].quantity
    dispatch({
      type: 'cart/increaseProduct',
      payload: {
        products
      }
    })
  }
  const handleRemove = () => {
    products.splice(indexProduct, 1)
    dispatch({
      type: 'cart/removeProduct',
      payload: {
        products
      }
    })
  }
  return (
    <div className='cart-item flex p-4 rounded-xl border border-black mb-3 justify-between'>
      <div className='cart-item-info flex items-center gap-16'>
        <img src={imgUrl} alt='' />
        <div>
          <p className='text-2xl font-bold mb-8'>{name}</p>
          <p className='text-2xl font-bold'>Total: ${price}</p>
        </div>
      </div>
      <div className='cart-item-action flex flex-col justify-center'>
        <Button text='Remove' color='red' onClick={handleRemove} />
        <div className='quantity-action flex rounded-md overflow-hidden gap-1 mt-8'>
          <span className='ct-action-quantity' onClick={handleDecrease}>
            -
          </span>
          <span className='ct-action-quantity'>{quantity}</span>
          <span className='ct-action-quantity' onClick={handleIncrease}>
            +
          </span>
        </div>
      </div>
    </div>
  )
}
export default CartItem
