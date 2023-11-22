import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
    typeLoading: ''
  },
  reducers: {
    switchLoading: (state, action) => {
      state.loading = action.payload.loading
      state.typeLoading = action.payload.typeLoading
    }
  }
})

export default loadingSlice
