import React, { useContext } from 'react'
import Context from '../../store/countContext/CountContext'

function TableHistory() {
  const [state] = useContext(Context)
  const { history } = state
  return (
    <div className='table-list flex overflow-x-auto '>
      {history.map((historyItem, historyIndex) => {
        return (
          <div key={historyIndex} className='min-w-full pb-9'>
            <p>
              Lần chơi thứ {history.length - historyIndex} / {history.length}
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
  )
}
export default TableHistory
