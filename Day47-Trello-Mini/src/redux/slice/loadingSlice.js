import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false
  },
  reducers: {
    switchLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export default loadingSlice
