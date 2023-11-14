import Cart from './Cart'
import Logo from './Logo'

export default function Header() {
  return (
    <header className='flex justify-between py-4'>
      <Logo />
      <Cart />
    </header>
  )
}
