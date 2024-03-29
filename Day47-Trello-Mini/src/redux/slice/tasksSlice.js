import { createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  }
})

export default tasksSlice
