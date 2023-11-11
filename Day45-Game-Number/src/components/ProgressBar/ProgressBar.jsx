import React, { useContext, useEffect, useRef } from 'react'
import Context from '../../store/countContext/CountContext'
export default function ProgressBar() {
  const [state, dispatch] = useContext(Context)
  const { numberOfAttempt } = state
  const count = useRef(numberOfAttempt)
  const progressBarRef = useRef()
  const rate = 100 - (100 / count.current) * (count.current - numberOfAttempt)
  useEffect(() => {
    progressBarRef.current.style.width = rate + '%'
  }, [rate])

  return (
    <>
      <div
        className='h-3 bg-emerald-900 transition-all duration-700'
        ref={progressBarRef}
      ></div>
    </>
  )
}
