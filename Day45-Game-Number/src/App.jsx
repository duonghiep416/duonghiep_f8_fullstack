import FormSubmit from './components/FormSubmit/FormSubmit'
import Nav from './components/Nav/Nav'
import ProgressBar from './components/ProgressBar/ProgressBar'
import TableHistory from './components/TableHistory/TableHistory'
import Welcome from './components/Welcome/Welcome'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ProgressBar />
      <div className='container mx-auto'>
        <Nav />
        <Welcome />
        <TableHistory />
        <FormSubmit />
      </div>
    </>
  )
}
export default App
