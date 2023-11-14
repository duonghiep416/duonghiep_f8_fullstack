import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Toast from './components/Toast/Toast'
function App() {
  return (
    <div className='App container mx-auto'>
      <Toast />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shoppingCart' element={<ShoppingCart />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
