import { createSlice } from '@reduxjs/toolkit'

const statusLoginSlice = createSlice({
  name: 'statusLogin',
  initialState: { status: Boolean(localStorage.getItem('apiKey')) || false },
  reducers: {
    switchStatusLogin: (state, action) => {
      state.status = action.payload
    }
  }
})

export default statusLoginSlice
