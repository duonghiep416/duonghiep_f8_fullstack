import { useDispatch, useSelector } from 'react-redux'
import TrashBin from '../TrashBin/TrashBin'
import { postTasks } from '../../utils/handleApi'
import filterTasks from '../../helpers/filterTasks'
import tasksSlice from '../../redux/slice/tasksSlice'
const { updateTasks } = tasksSlice.actions
// eslint-disable-next-line react/prop-types
function HeaderItemCol({ header, style, idColumn }) {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const handleRemoveColumn = () => {
    const colIndex = tasks.findIndex((col) => col.column === idColumn)
    const tasksCopy = [...tasks]
    tasksCopy.splice(colIndex, 1)
    dispatch(updateTasks(tasksCopy))
    postTasks(filterTasks(tasksCopy), dispatch)
  }
  return (
    <div
      className='flex justify-between w-full p-4 bg-smoky-gray text-xl font-bold'
      style={style}
    >
      {header}
      <TrashBin onClick={handleRemoveColumn} />
    </div>
  )
}
export default HeaderItemCol
