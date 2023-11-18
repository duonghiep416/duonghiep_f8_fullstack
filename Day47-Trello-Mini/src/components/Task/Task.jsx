function Task(children) {
  return (
    <div className='font-semibold text-lg bg-smoky-gray rounded-md min-h-[100px] p-2 border-2 hover:border-teal-400 cursor-pointer'>
      <input
        type='text'
        value={children.children}
        className='bg-inherit outline-none border-none'
        disabled
      />
    </div>
  )
}
export default Task
