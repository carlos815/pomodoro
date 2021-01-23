import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const timerAdapter = createEntityAdapter()

const initialState = timerAdapter.getInitialState({
  status: 'idle',
  setTo: 1,
  start: 0,
  total: 0,
  pomodoro: 1500000,
  longRest: 600000,
  shortRest: 300000,
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
  historyShown: true,
  history: [],
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
      state.history.push({
        type: state.type,
        timestamp: Date.now(),
      })
    },
    setHistShown(state, action) {
      const historyState =
        action.payload !== null
          ? action.payload
          : state.historyShown === true
          ? false
          : true

      state.historyShown = historyState
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
  setHistShown,
} = timerSlice.actions

export const timerReducer = timerSlice.reducer
