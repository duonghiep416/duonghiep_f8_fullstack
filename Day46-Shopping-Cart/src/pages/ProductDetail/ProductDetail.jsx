import { useNavigate, useParams } from 'react-router-dom'
import * as request from '../../utils/request'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
function ProductDetail() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector((state) => state.productsCart)
  const indexProduct = products.findIndex(
    (product) => product._id === params.id
  )

  const quantity = indexProduct === -1 ? 0 : products[indexProduct].quantity
  const [productDetail, setProductDetail] = useState({})
  const fetchAPI = async () => {
    try {
      dispatch({
        type: 'loading/switch',
        payload: true
      })
      const res = await request.get(`/products/${params.id}`)
      setProductDetail(res.data)
      dispatch({
        type: 'loading/switch',
        payload: false
      })
    } catch (error) {
      toast.error('Sản phẩm không tồn tại')
      navigate('/')
    }
  }

  const handleAddCart = () => {
    dispatch({
      type: 'cart/add',
      payload: {
        _id: params.id,
        name: productDetail.name,
        price: productDetail.price * (quantity + 1),
        quantity: quantity + 1,
        imgUrl: productDetail.image
      }
    })

    toast.success('Đã thêm vào giỏ hàng!!!')
  }

  useEffect(() => {
    fetchAPI()
  }, [])
  return (
    <div>
      <Header />
      <h1 className='font-bold text-3xl text-center text-blue-500 py-5'>
        Product Detail
      </h1>
      <div className='product-container flex'>
        <div className='product-image object-cover basis-2/6'>
          <img src={productDetail.image} alt='' className='w-full h-full' />
        </div>
        <div className='product-info flex flex-col justify-between items-start ml-10 basis-4/6'>
          <p className='product-brand text-blue-500'>{productDetail.brand}</p>
          <p className='product-name font-bold text-3xl text-center text-lime-500 py-5'>
            {productDetail.name}
          </p>
          <p className='product-description text-lg'>
            {productDetail.description}
          </p>
          <p className='product-price font-bold text-2xl'>
            ${productDetail.price}
          </p>
          <p className='product-category px-2 py-1 rounded-full bg-red-700/40 text-white'>
            {productDetail.category}
          </p>
          <Button color='emerald' onClick={handleAddCart} text='Add to cart' />
        </div>
      </div>
    </div>
  )
}
export default ProductDetail
