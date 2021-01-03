import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const timerAdapter = createEntityAdapter()

const initialState = timerAdapter.getInitialState({
  status: 'idle',
  setTo: 1500000,
  start: 0,
  total: 0,
  pomodoro: 1,
  longRest: 1,
  shortRest: 1,
  type: 'pomodoro',
  mode: 'auto',
  timeline: [
    'pomodoro',
    'shortRest',
    'pomodoro',
    'shortRest',
    'pomodoro',
    'shortRest',
    'pomodoro',
    'longRest',
  ],
})

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start(state) {
      state.status = 'running'
      state.start = Date.now() - state.total
    },
    pause(state) {
      const now = Date.now()
      state.status = 'paused'
      state.total = now - state.start
    },
    reset(state) {
      state.status = 'idle'
      state.setTo = state[state.type]
      state.start = 0
      state.total = 0
    },
    mode(state, action) {
      state.status = 'idle'
      state.start = 0
      state.total = 0
      state.mode = action.payload
    },
    type(state, action) {
      state.status = 'idle'
      state.start = 0
      state.total = 0
      state.type = action.payload
      state.setTo = state[state.type]
    },
    next(state) {
      state.status = 'idle'

      const first = state.timeline[0]
      state.timeline.shift()
      state.timeline.push(first)
      state.type = state.timeline[0]
      state.setTo = state[state.type]
    },
    ended(state) {
      state.status = 'ended'
      state.setTo = 0
      state.start = 0
      state.total = 0
    },
  },
})
export const {
  start,
  pause,
  reset,
  mode,
  type,
  next,
  ended,
} = timerSlice.actions

export const timerReducer = timerSlice.reducer
