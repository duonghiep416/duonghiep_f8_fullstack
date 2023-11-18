const handleMatchTasksWithColumns = (tasks, columns) => {
  const result = []
  tasks.forEach((task) => {
    const column = columns.find((column) => column.column === task.column)
    if (column) {
      const index = columns.indexOf(column)
      if (!result[index]) {
        result[index] = {
          ...column,
          tasks: []
        }
      }
      result[index].tasks.push(task)
    }
  })
  return result
}

export default handleMatchTasksWithColumns
