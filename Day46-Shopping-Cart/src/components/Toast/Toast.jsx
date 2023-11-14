import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Toast() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  )
}
