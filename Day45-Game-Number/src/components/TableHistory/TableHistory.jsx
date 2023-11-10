import React, { useContext, useEffect, useRef } from 'react'
import Context from '../../store/countContext/CountContext'
import binImg from '../../assets/bin.svg'
function TableHistory() {
  const [state, dispatch] = useContext(Context)
  const { history } = state
  const tableRef = useRef()

  const handleScrollTable = (e) => {
    if (e.key === 'ArrowRight') {
      tableRef.current.scroll({
        left: tableRef.current.offsetWidth + tableRef.current.scrollLeft,
        behavior: 'smooth'
      })
    } else if (e.key === 'ArrowLeft') {
      tableRef.current.scroll({
        left: tableRef.current.scrollLeft - tableRef.current.offsetWidth,
        behavior: 'smooth'
      })
    }
  }

  const removeHistory = () => {
    dispatch({
      type: 'history/clear'
    })
  }
  useEffect(() => {
    document.addEventListener('keydown', handleScrollTable)
    return () => document.removeEventListener('keydown', handleScrollTable)
  }, [history])
  return (
    history.length !== 0 && (
      <>
        <div
          className='trash-container flex items-center justify-center w-10 h-10 hover:bg-slate-700/70 ml-auto cursor-pointer rounded-lg transition dark:bg-slate-200'
          onClick={removeHistory}
        >
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
                <table className='table-auto w-full border-collapse border dark:border-slate-400 mt-7 text-center'>
                  <thead>
                    <tr>
                      <th className='w-[50vh] border border-black dark:border-slate-400'>
                        Số lần chơi
                      </th>
                      <th
                        className='w-[50vh]
                border border-black dark:border-slate-400'
                      >
                        Số nhập vào
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyItem.answers.map((answer, index) => (
                      <tr key={index}>
                        <td className='ct-table-col border border-black dark:border-slate-400'>
                          {index + 1}
                        </td>
                        <td className='ct-table-col border border-black dark:border-slate-400'>
                          {answer}
                        </td>
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
