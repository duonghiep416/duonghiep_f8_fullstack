/* eslint-disable react/prop-types */
import { ThreeDots } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
function Loading({ type }) {
  const loading = useSelector((state) => state.loading.loading)
  return (
    loading &&
    (type === 'loading-text' ? (
      <p>🔁 Đang đồng bộ dữ liệu</p>
    ) : (
      <ThreeDots
        height='80'
        width='80'
        radius='9'
        color='#4fa94d'
        ariaLabel='three-dots-loading'
        wrapperStyle={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        wrapperClassName=''
        visible={loading}
      />
    ))
  )
}
export default Loading
