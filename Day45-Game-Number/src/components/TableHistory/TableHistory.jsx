import React, { useContext, useEffect, useRef } from 'react'
import Context from '../../store/countContext/CountContext'
import binImg from '../../assets/bin.svg'
import identifyHistoryPage from '../../helpers/identifyHistoryPage'
function TableHistory() {
  const [state, dispatch] = useContext(Context)
  const { history } = state
  const tableRef = useRef()
  const page = useRef(0)

  const handleScrollTable = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        page.current = identifyHistoryPage('roundDown', tableRef)
        if (page.current < tableRef.current.children.length - 1) {
          tableRef.current.scroll({
            left: tableRef.current.offsetWidth * ++page.current,
            behavior: 'smooth'
          })
        }
        break
      case 'ArrowLeft':
        page.current = identifyHistoryPage('roundUp', tableRef)
        if (page.current > 0) {
          tableRef.current.scroll({
            left: tableRef.current.offsetWidth * --page.current,
            behavior: 'smooth'
          })
        }
        break
      default:
        break
    }
  }

  const removeHistory = () => {
    dispatch({
      type: 'history/clear'
    })
  }
  useEffect(() => {
    if (history.length !== 0) {
      document.addEventListener('keydown', handleScrollTable)
      tableRef.current.scroll({
        left: 0,
        behavior: 'smooth'
      })
    }

    return () => document.removeEventListener('keydown', handleScrollTable)
  }, [history])

  return (
    history.length !== 0 && (
      <>
        <div className='ct-trash-container' onClick={removeHistory}>
          <img src={binImg} alt='Bin Image' className='w-7' />
        </div>
        <div className='table-list flex overflow-x-auto' ref={tableRef}>
          {history.map((historyItem, historyIndex) => {
            return (
              <div key={historyIndex} className='min-w-full pb-9'>
                <p>
                  Lần chơi thứ {history.length - historyIndex} /{' '}
                  {history.length}
                </p>
                <p className='text-green-500'>
                  Đáp án đúng: {historyItem.correctAnswer}
                </p>
                <table className='ct-table-history'>
                  <thead>
                    <tr>
                      <th className='ct-table-col'>Số lần chơi</th>
                      <th className='ct-table-col'>Số nhập vào</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyItem.answers.map((answer, index) => (
                      <tr key={index}>
                        <td className='ct-table-col'>{index + 1}</td>
                        <td className='ct-table-col'>{answer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      </>
    )
  )
}
export default TableHistory
