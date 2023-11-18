/* eslint-disable react/prop-types */
import Task from '../Task/Task'
import HeaderItemCol from './HeaderItemCol'

function ItemCol({ tasks, header, provided }) {
  return (
    <div
      className='w-[350px] flex-shrink-0 rounded-md bg-white overflow-hidden'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <HeaderItemCol header={header} />
      <div className='task-container p-2 flex flex-col gap-2 h-[440px] overflow-y-auto'>
        {tasks.map((task) => (
          <Task key={task._id}>{task.content}</Task>
        ))}
      </div>
    </div>
  )
}
export default ItemCol
