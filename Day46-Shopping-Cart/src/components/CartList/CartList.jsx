import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import Button from '../Button/Button'
function CartList() {
  const productsCart = useSelector((state) => state.productsCart)
  const dispatch = useDispatch()
  const handleCheckout = () => {
    dispatch({
      type: 'cart/clear'
    })
  }
  return (
    <>
      <h1 className='font-bold text-3xl text-center text-blue-500 mb-10'>
        Shopping Cart
      </h1>
      {productsCart.length ? (
        <div>
          {productsCart.map((product) => {
            const { _id, name, price, imgUrl, quantity } = product
            return (
              <CartItem
                key={_id}
                id={_id}
                name={name}
                price={price}
                imgUrl={imgUrl}
                quantity={quantity}
              />
            )
          })}
          <Button text='Checkout' color='emerald' onClick={handleCheckout} />
        </div>
      ) : (
        <p className='mt-10 font-bold text-2xl text-center text-blue-500'>
          Không có sản phẩm nào trong giỏ hàng
        </p>
      )}
    </>
  )
}
export default CartList
