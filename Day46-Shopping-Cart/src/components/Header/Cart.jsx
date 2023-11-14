import cartSVG from '../../assets/shopping-cart.svg'
import { Link } from 'react-router-dom'
export default function Cart() {
  return (
    <Link to='/shoppingCart'>
      <img
        src={cartSVG}
        alt='Shopping Cart SVG'
        className='w-10 h-10 object-contain'
      />
    </Link>
  )
}
