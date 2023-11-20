import { postTasks } from '../utils/handleApi'
import filterTasks from './filterTasks'

function handleOnDragEnd(
  result,
  characters,
  updateCharacters,
  data,
  dispatch,
  updateTasks
) {
  let { destination, source, type } = result
  if (type === 'column' && destination.index !== source.index) {
    const newCharacters = [...characters]
    const [removed] = newCharacters.splice(source.index, 1)
    newCharacters.splice(destination.index, 0, removed)
    updateCharacters(newCharacters)
    dispatch(updateTasks(newCharacters))
  } else if (type === 'tasks') {
    const newCharacters = [...characters]
    const removedIndex = newCharacters.findIndex(
      (item) => item._id === source.droppableId
    )
    const tasksCopy = [...newCharacters[removedIndex].tasks]
    const [removedTask] = tasksCopy.splice(source.index, 1)
    newCharacters[removedIndex] = {
      ...newCharacters[removedIndex],
      tasks: tasksCopy
    }

    const addedIndex = newCharacters.findIndex(
      (item) => item._id === destination.droppableId
    )
    const addedTasksCopy = [...newCharacters[addedIndex].tasks]
    addedTasksCopy.splice(destination.index, 0, removedTask)
    newCharacters[addedIndex] = {
      ...newCharacters[addedIndex],
      tasks: addedTasksCopy
    }

    updateCharacters(newCharacters)
    dispatch(updateTasks(newCharacters))
    postTasks(filterTasks(newCharacters), dispatch)
  }
}
export default handleOnDragEnd
