import { toast } from 'react-toastify'
import * as request from './request'
import handleMatchTasksWithColumns from '../helpers/matchTasksWithCol'
import tasksSlice from '../redux/slice/tasksSlice'
import statusLoginSlice from '../redux/slice/statusLoginSlice'

const { updateTasks } = tasksSlice.actions
const { switchStatusLogin } = statusLoginSlice.actions

const getTask = async (dispatch, updateCharacters) => {
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

const postTasks = async (tasks, dispatch) => {
  try {
    await request.post('tasks', tasks)
  } catch (error) {
    toast.warning('Vui lòng đăng nhập lại')
    dispatch(switchStatusLogin(false))
  }
}

export { getTask, postTasks }
