import { useState } from 'react'
import * as request from '../../utils/request'
import { useDispatch } from 'react-redux'
import loadingSlice from '../../redux/slice/loadingSlice'
import statusLoginSlice from '../../redux/slice/statusLoginSlice'
import { toast } from 'react-toastify'
const { switchLoading } = loadingSlice.actions
const { switchStatusLogin } = statusLoginSlice.actions
function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const handleSetEmail = (e) => {
    setEmail(e.target.value)
  }
  const getApiKey = async () => {
    try {
      dispatch(switchLoading(true))
      const res = await request.get('api-key', { params: { email: email } })
      localStorage.setItem('apiKey', res.data.apiKey)
      localStorage.setItem('email', email)
      dispatch(switchLoading(false))
      dispatch(switchStatusLogin(true))
      toast.success('Đăng nhập thành công')
    } catch (error) {
      dispatch(switchLoading(false))
      dispatch(switchStatusLogin(false))
      toast.warning('Email không tồn tại')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getApiKey()
  }
  return (
    <div>
      <h1 className='font-bold text-lg mb-3'>Please Enter Email</h1>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='email'
          name=''
          id=''
          value={email}
          onChange={handleSetEmail}
          className='outline-none w-96 h-10 border-none bg-teal-200 pl-3 mb-3'
        />
        <br />
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition-all'>
          Submit
        </button>
      </form>
    </div>
  )
}
export default Login
