import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    switchLoading: (state, action) => action.payload
  }
})

export default loadingSlice
