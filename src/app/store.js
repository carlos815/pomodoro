import { configureStore } from '@reduxjs/toolkit'
import { stopWatchReducer } from '../features/stopWatchSlice'
import { timerReducer } from '../features/timerSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import initSubscriber from 'redux-subscriber'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedTimerReducer = persistReducer(persistConfig, timerReducer)

export const store = configureStore({
  reducer: { stopWatch: stopWatchReducer, timer: persistedTimerReducer },
})

initSubscriber(store)
