import { configureStore } from '@reduxjs/toolkit'
import { stopWatchReducer } from '../features/stopWatchSlice'
import { timerReducer } from '../features/timerSlice'

import initSubscriber from 'redux-subscriber'

export const store = configureStore({
  reducer: { stopWatch: stopWatchReducer, timer: timerReducer },
})

initSubscriber(store)
