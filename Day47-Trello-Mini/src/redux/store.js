import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './slice/loadingSlice'
import statusLoginSlice from './slice/statusLoginSlice'
import tasksSlice from './slice/tasksSlice'
const rootReducer = {
  reducer: {
    loading: loadingSlice.reducer,
    statusLogin: statusLoginSlice.reducer,
    tasks: tasksSlice.reducer
  }
}

export const store = configureStore(rootReducer)
