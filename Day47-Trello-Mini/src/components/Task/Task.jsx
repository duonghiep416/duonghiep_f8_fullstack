import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tasksSlice from '../../redux/slice/tasksSlice'
import { postTasks } from '../../utils/handleApi'
import filterTasks from '../../helpers/filterTasks'
import TrashBin from '../TrashBin/TrashBin'

const { updateTasks } = tasksSlice.actions
/* eslint-disable react/prop-types */
function Task({ provided, task, children }) {
  const [inputValue, setInputValue] = useState(children)
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const handleChangeInputValue = () => {
    const colIndex = tasks.findIndex((col) => col.column === task.column)
    const taskIndex = tasks[colIndex].tasks.findIndex(
      (item) => item._id === task._id
    )
    const tasksCopy = [...tasks]
    const columnCopy = { ...tasksCopy[colIndex] }
    columnCopy.tasks = [...columnCopy.tasks]
    const taskCopy = { ...columnCopy.tasks[taskIndex] }
    taskCopy.content = inputValue
    columnCopy.tasks[taskIndex] = taskCopy
    tasksCopy[colIndex] = columnCopy
    dispatch(updateTasks(tasksCopy))
    postTasks(filterTasks(tasksCopy), dispatch)
  }
  const handleRemoveTask = () => {
    const colIndex = tasks.findIndex((col) => col.column === task.column)
    const tasksCopy = [...tasks]
    const columnCopy = { ...tasksCopy[colIndex] }
    columnCopy.tasks = [...columnCopy.tasks]
    const taskIndex = columnCopy.tasks.findIndex(
      (item) => item._id === task._id
    )
    columnCopy.tasks.splice(taskIndex, 1)
    tasksCopy[colIndex] = columnCopy
    dispatch(updateTasks(tasksCopy))
    postTasks(filterTasks(tasksCopy), dispatch)
  }
  const inputRef = useRef()
  return (
    <div
      className='task-container font-semibold text-lg bg-smoky-gray rounded-md min-h-[100px] p-2 border-2 hover:border-teal-400 cursor-pointer'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onDoubleClick={() => {
        inputRef.current.disabled = false
        inputRef.current.focus()
      }}
      onClick={() => {
        inputRef.current.disabled = true
        inputRef.current.blur()
      }}
    >
      <input
        type='text'
        value={inputValue}
        ref={inputRef}
        disabled={true}
        className='select-none pointer-events-none bg-inherit outline-none border-none'
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleChangeInputValue}
      />
      <TrashBin onClick={handleRemoveTask} />
    </div>
  )
}
export default Task
