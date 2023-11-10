import React, { useContext, useRef } from 'react'
import Context from '../../store/countContext/CountContext'
function Welcome() {
  const [state] = useContext(Context)
  const { numberOfAttempt, fromNumber, toNumber } = state
  const count = useRef(numberOfAttempt)
  return (
    <>
      <h3 className='h3'>Chào mừng bạn đến với trò chơi đoán số!</h3>
      <h3 className='h3'>Còn {numberOfAttempt + '/' + count.current} lượt</h3>
      <h3 className='h3'>
        Bạn cần tìm kiếm 1 số từ {fromNumber} đến {toNumber}
      </h3>
    </>
  )
}
export default Welcome
