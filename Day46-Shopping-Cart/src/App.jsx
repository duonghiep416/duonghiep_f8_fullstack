import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Toast from './components/Toast/Toast'
import NotFound from './pages/NotFound/NotFound'
import Loading from './components/Loading/Loading'
import ProductDetail from './pages/ProductDetail/ProductDetail'
function App() {
  return (
    <div className='App container mx-auto'>
      <Toast />
      <Loading />
      <Router>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/:page' element={<Home />} />
          <Route path='/shoppingCart' element={<ShoppingCart />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
