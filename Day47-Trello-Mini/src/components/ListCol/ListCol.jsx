import { useEffect, useState } from 'react'
import ItemCol from '../ItemCol/ItemCol'
import * as request from '../../utils/request'
import handleMatchTasksWithColumns from '../../helpers/matchTasksWithCol'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import statusLoginSlice from '../../redux/slice/statusLoginSlice'
import tasksSlice from '../../redux/slice/tasksSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const { switchStatusLogin } = statusLoginSlice.actions
const { updateTasks } = tasksSlice.actions
function ListCol() {
  const [characters, updateCharacters] = useState([])
  const data = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const getTask = async () => {
    try {
      const res = await request.get('tasks', {}, true)
      const tasks = res.data.tasks
      const columns = res.data.columns
      dispatch(updateTasks(handleMatchTasksWithColumns(tasks, columns)))
      updateCharacters(handleMatchTasksWithColumns(tasks, columns))
    } catch (error) {
      toast.warning('Vui lòng đăng nhập lại')
      dispatch(switchStatusLogin(false))
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateCharacters(items)
    dispatch(updateTasks(items))
  }

  useEffect(() => {
    getTask()
  }, [])
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='characters' direction='horizontal'>
        {(provided) => (
          <div
            className='characters flex flex-nowrap gap-3'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((column, index) => (
              <Draggable
                key={column._id}
                draggableId={column._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <ItemCol
                    tasks={column.tasks}
                    header={column.columnName}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default ListCol
