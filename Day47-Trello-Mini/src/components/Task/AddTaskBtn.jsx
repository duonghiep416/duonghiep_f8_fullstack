/* eslint-disable react/prop-types */
import plusIcon from '../../assets/plus.png'
import { useDispatch, useSelector } from 'react-redux'
import tasksSlice from '../../redux/slice/tasksSlice'
import { v4 as uuidv4 } from 'uuid'
import filterTasks from '../../helpers/filterTasks'
import { postTasks } from '../../utils/handleApi'
import debounce from 'lodash/debounce'
const { updateTasks } = tasksSlice.actions
function AddTaskBtn({ idColumn, addTask }) {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const handleAddTask = () => {
    const newTask = {
      _id: uuidv4(),
      content: 'Untitled task',
      column: idColumn
    }
    const tasksCopy = [...tasks]
    const indexColumn = tasksCopy.findIndex((task) => task.column === idColumn)
    const taskCopy = { ...tasksCopy[indexColumn] }
    taskCopy.tasks = [...taskCopy.tasks, newTask]
    tasksCopy[indexColumn] = taskCopy
    dispatch(updateTasks(tasksCopy))
    postTasks(filterTasks(tasksCopy), dispatch)
  }
  const handleAddColumn = () => {
    const newColumn = {
      _id: uuidv4(),
      columnName: 'Untitled',
      tasks: [],
      column: parseInt(uuidv4().slice(0, 4), 16) % 10000
    }
    const tasksCopy = [...tasks]
    tasksCopy.push(newColumn)
    dispatch(updateTasks(tasksCopy))
  }

  // const handleAddTaskDebounce = debounce(handleAddTask, 2000)
  // const handleAddColumnDebounce = debounce(handleAddColumn, 2000)
  return (
    <button
      className='flex items-center gap-2 p-2  bg-gray-200 h-16 pl-3 min-w-[350px] text-emerald-500 hover:bg-gray-100 transition-all  rounded-md'
      onClick={addTask ? handleAddTask : handleAddColumn}
    >
      <img src={plusIcon} alt='plus' className='w-5 h-5' />
      <span className='font-semibold'>Add another task</span>
    </button>
  )
}
export default AddTaskBtn
