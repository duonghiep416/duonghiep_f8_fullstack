import { toast } from 'react-toastify'
import cartSvg from '../../assets/shopping-cart.svg'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line react/prop-types
function ProductItem({ imgUrl, productName, productPrice, id }) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productsCart)
  const indexProduct = products.findIndex((product) => product._id === id)

  const quantity = indexProduct === -1 ? 0 : products[indexProduct].quantity
  const handleAddCart = () => {
    dispatch({
      type: 'cart/add',
      payload: {
        _id: id,
        name: productName,
        price: productPrice * (quantity + 1),
        quantity: quantity + 1,
        imgUrl
      }
    })

    toast.success('Đã thêm vào giỏ hàng!!!')
  }
  return (
    <div className='product-item max-h-96'>
      <img src={imgUrl} alt='' className='w-64 h-56 object-cover mb-4' />
      <p className='product-name text-2xl font-bold mb-2 truncate w-8/12'>
        {productName}
      </p>
      <p className='product-price text-xl font-bold mb-2'>${productPrice}</p>
      <span
        className='add-to-cart-btn inline-block p-3 rounded-md  bg-slate-400 cursor-pointer hover:bg-slate-300 transition'
        onClick={handleAddCart}
      >
        <img src={cartSvg} alt='' className='w-7 h-7' />
      </span>
    </div>
  )
}
export default ProductItem
