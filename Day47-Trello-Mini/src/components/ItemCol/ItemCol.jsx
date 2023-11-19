/* eslint-disable react/prop-types */
import Task from '../Task/Task'
import HeaderItemCol from './HeaderItemCol'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function ItemCol({ tasks, header, provided, snapshot }) {
  const handleDragEnd = (result) => {
    console.log(result)
  }
  return (
    <div
      className='w-[350px] flex-shrink-0 rounded-md bg-white overflow-hidden'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <HeaderItemCol
        header={header}
        style={{ backgroundColor: snapshot.isDragging ? '#CDE7E4' : '' }}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='task-list'>
          {(provided) => (
            <div
              className='task-container p-2 flex flex-col gap-2 h-[440px] overflow-y-auto'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <Task provided={provided}>{task.content}</Task>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
export default ItemCol
