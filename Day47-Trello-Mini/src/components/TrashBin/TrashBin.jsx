/* eslint-disable react/prop-types */
import trashBin from '../../assets/recycle-bin.png'
function TrashBin({ onClick }) {
  return (
    <button
      className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transitions ml-auto'
      onClick={onClick}
    >
      <img src={trashBin} alt='' className='w-5 h-auto' />
    </button>
  )
}
export default TrashBin
