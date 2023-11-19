/* eslint-disable react/prop-types */
function Task({ provided, children }) {
  return (
    <div
      className='font-semibold text-lg bg-smoky-gray rounded-md min-h-[100px] p-2 border-2 hover:border-teal-400 cursor-pointer'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <input
        type='text'
        value={children}
        className='bg-inherit outline-none border-none'
        disabled
      />
    </div>
  )
}
export default Task
