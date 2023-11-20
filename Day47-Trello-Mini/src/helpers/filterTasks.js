const filterTasks = (data) => {
  const result = []
  data.forEach((task) => {
    task.tasks.forEach((todo) => {
      result.push({
        column: task.column,
        content: todo.content,
        columnName: task.columnName
      })
    })
  })
  return result
}
export default filterTasks
