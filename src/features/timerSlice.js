import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const timerAdapter = createEntityAdapter()

const initialState = timerAdapter.getInitialState({
  status: 'idle',
  soundAvailable: false,
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
  historyShown: false,
  history: [],
})

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start(state) {
      state.status = 'running'
      state.start = Date.now() - state.total
      state.historyShown = false
    },
    pause(state) {
      const now = Date.now()
      state.status = 'paused'
      state.total = now - state.start
      state.historyShown = false
    },
    reset(state) {
      state.status = 'idle'
      state.setTo = state[state.type]
      state.start = 0
      state.total = 0
      state.historyShown = false

      if (process.env.NODE_ENV === 'development') {
        state.pomodoro = 1000
        state.longRest = 1000
        state.shortRest = 1000
      } else {
        state.pomodoro = 1500000
        state.longRest = 600000
        state.shortRest = 300000
      }
    },
    mode(state, action) {
      state.status = 'idle'
      state.start = 0
      state.total = 0
      state.mode = action.payload
      state.historyShown = false
    },
    type(state, action) {
      state.status = 'idle'
      state.start = 0
      state.total = 0
      state.type = action.payload
      state.setTo = state[state.type]
      state.historyShown = false
    },
    next(state) {
      state.status = 'idle'

      const first = state.timeline[0]
      state.timeline.shift()
      state.timeline.push(first)
      state.type = state.timeline[0]
      state.setTo = state[state.type]
      state.historyShown = false
    },
    ended(state) {
      state.status = 'ended'
      state.setTo = 0
      state.start = 0
      state.total = 0
      state.historyShown = false
      state.history.push({
        type: state.type,
        timestamp: Date.now(),
      })
    },
    setHistShown(state, action) {
      //Safe to use as a toggle if it doesn't receive any payload
      const historyState =
        action.payload === undefined ? !state.historyShown : action.payload
      state.historyShown = historyState
    },
    setSoundAvailable(state, action) {
      const soundState =
        action.payload === undefined ? !state.soundAvailable : action.payload
      state.soundAvailable = soundState
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
  setSoundAvailable,
} = timerSlice.actions

export const timerReducer = timerSlice.reducer
