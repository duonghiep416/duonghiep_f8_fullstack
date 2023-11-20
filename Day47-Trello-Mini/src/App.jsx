import Toast from './components/Toast/Toast'
import ListCol from './components/ListCol/ListCol'
import Login from './components/Login/Login'
import { useSelector } from 'react-redux'
function App() {
  const loginStatus = useSelector((state) => state.statusLogin.status)
  return (
    <>
      <Toast />
      <div className='flex items-center w-auto h-[98vh] px-11'>
        {loginStatus ? <ListCol /> : <Login />}
      </div>
    </>
  )
}
export default App
