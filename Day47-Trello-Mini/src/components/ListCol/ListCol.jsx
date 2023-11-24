import { useEffect, useState } from 'react'
import ItemCol from '../ItemCol/ItemCol'
import { useDispatch, useSelector } from 'react-redux'
import tasksSlice from '../../redux/slice/tasksSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import handleOnDragEnd from '../../helpers/handleDragEnd'
import AddTaskBtn from '../Task/AddTaskBtn'
import { getTask } from '../../utils/handleApi'

const { updateTasks } = tasksSlice.actions
function ListCol() {
  const [characters, updateCharacters] = useState([])
  const data = useSelector((state) => state.tasks.tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    getTask(dispatch, updateCharacters)
  }, [])

  useEffect(() => {
    updateCharacters(data)
  }, [data])
  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleOnDragEnd(
          result,
          characters,
          updateCharacters,
          data,
          dispatch,
          updateTasks
        )
      }}
    >
      <Droppable droppableId='characters' direction='horizontal' type='column'>
        {(provided) => (
          <div
            className='characters flex flex-nowrap gap-3 pr-11'
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
                    idColumn={column.column}
                    tasks={column.tasks}
                    header={column.columnName}
                    provided={provided}
                    snapshot={snapshot}
                    id={column._id}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddTaskBtn />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default ListCol
