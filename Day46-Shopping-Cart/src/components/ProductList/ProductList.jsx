import ProductItem from './ProductItem'
import * as request from '../../utils/request'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
export default function ProductList() {
  const params = useParams()
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const page = useRef(params.page ? parseInt(params.page) : 1)
  const nextPage = (e) => {
    e.preventDefault()
    page.current++
    document.documentElement.scroll({
      top: 0,
      behavior: 'smooth'
    })
    // fetchAPI()
    navigate(`/${page.current}`)
  }
  const prevPage = (e) => {
    e.preventDefault()
    if (page.current > 1) {
      page.current--
      document.documentElement.scroll({
        top: 0,
        behavior: 'smooth'
      })
      // fetchAPI()
      navigate(`/${page.current}`)
    } else {
      toast.warning('Bạn đang ở trang đầu tiên')
    }
  }
  const fetchAPI = async () => {
    try {
      dispatch({
        type: 'loading/switch',
        payload: true
      })
      const res = await request.get('/products', {
        params: {
          page: page.current,
          limit: 20
        }
      })
      setProducts(res.data.listProduct)
      dispatch({
        type: 'loading/switch',
        payload: false
      })
    } catch (error) {
      toast.error('Có lỗi xảy ra')
      navigate('/')
    }
  }
  useEffect(() => {
    if (!params.page) {
      page.current = 1
    }
    fetchAPI()
  }, [params])
  return (
    <>
      <div className='product-list grid gap-4 grid-cols-4 py-5'>
        {products.map((product) => {
          const { image, _id, name, price } = product
          return (
            <ProductItem
              key={_id}
              id={_id}
              imgUrl={image}
              productName={name}
              productPrice={price}
            />
          )
        })}
      </div>
      <div className='action-btn flex justify-center py-5'>
        <Button
          text='Prev'
          color='amber'
          tailwindCss='basis-1/2'
          onClick={prevPage}
        />
        <Button
          text='Next'
          color='emerald'
          tailwindCss='basis-1/2'
          onClick={nextPage}
        />
      </div>
    </>
  )
}
