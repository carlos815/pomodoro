import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const stopWatchAdapter = createEntityAdapter()
const initialState = stopWatchAdapter.getInitialState({
  isOn: false,
  total: 0,
  start: 0,
  hist: [],
})

const stopWatchSlice = createSlice({
  name: 'stopWatch',
  initialState,
  reducers: {
    start(state) {
      state.isOn = true
      state.start = Date.now() - state.total
    },
    pause(state) {
      const now = Date.now()
      state.isOn = false
      state.total = now - state.start
      state.hist.push(now - state.start)
    },
    reset(state) {
      state.isOn = false
      state.total = 0
      state.start = 0
      state.hist = []
    },
  },
})
export const { start, pause, reset } = stopWatchSlice.actions

export const stopWatchReducer = stopWatchSlice.reducer
