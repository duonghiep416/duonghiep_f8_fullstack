import { toast } from 'react-toastify'
import * as request from './request'
import handleMatchTasksWithColumns from '../helpers/matchTasksWithCol'
import tasksSlice from '../redux/slice/tasksSlice'
import statusLoginSlice from '../redux/slice/statusLoginSlice'
import { debounce } from 'lodash'
import loadingSlice from '../redux/slice/loadingSlice'
const { updateTasks } = tasksSlice.actions
const { switchStatusLogin } = statusLoginSlice.actions
const { switchLoading } = loadingSlice.actions

const getTask = async (dispatch, updateCharacters) => {
  try {
    dispatch(switchLoading(true))
    const res = await request.get('tasks', {}, true)
    dispatch(switchLoading(false))
    const tasks = res.data.tasks
    const columns = res.data.columns
    await dispatch(updateTasks(handleMatchTasksWithColumns(tasks, columns)))
    updateCharacters(handleMatchTasksWithColumns(tasks, columns))
  } catch (error) {
    toast.warning('Vui lòng đăng nhập lại')
    dispatch(switchStatusLogin(false))
    dispatch(switchLoading(false))
  }
}

const handlePostTasks = async (tasks, dispatch) => {
  try {
    dispatch(switchLoading(true))
    await request.post('tasks', tasks)
    dispatch(switchLoading(false))
  } catch (error) {
    toast.warning('Vui lòng đăng nhập lại')
    dispatch(switchLoading(false))
    dispatch(switchStatusLogin(false))
  }
}

const postTasks = debounce(handlePostTasks, 1300)

export { getTask, postTasks }
