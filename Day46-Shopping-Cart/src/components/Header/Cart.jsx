import { useSelector } from 'react-redux'
import cartSVG from '../../assets/shopping-cart.svg'
import { Link } from 'react-router-dom'
export default function Cart() {
  const products = useSelector((state) => state.productsCart)
  const total = products.length
    ? products.reduce((acc, product) => {
        return acc + product.quantity
      }, 0)
    : 0
  return (
    <Link to='/shoppingCart' className='relative'>
      <img
        src={cartSVG}
        alt='Shopping Cart SVG'
        className='w-10 h-10 object-contain'
      />
      {products.length > 0 && (
        <span className='absolute bottom-3 right-0 w-5 h-5 rounded-full bg-red-500 text-white flex justify-center items-center'>
          {total}
        </span>
      )}
    </Link>
  )
}
