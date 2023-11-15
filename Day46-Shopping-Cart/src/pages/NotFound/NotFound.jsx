import notFoundImg from '../../assets/notFound.png'
function NotFound() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <img src={notFoundImg} alt='' />
    </div>
  )
}
export default NotFound
