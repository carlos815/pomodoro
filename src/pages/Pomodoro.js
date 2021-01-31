import React from 'react'
import { Helmet } from 'react-helmet'

import Display from '../components/Display'
import {
  start,
  pause,
  reset,
  mode,
  type,
  next,
  setHistShown,
} from '../features/timerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as SkipIcon } from '../assets/images/skip-icon.svg'
import { ReactComponent as PlayIcon } from '../assets/images/play-icon.svg'
import { ReactComponent as NotificationIcon } from '../assets/images/notification.svg'
import { ReactComponent as HistoryIcon } from '../assets/images/history-icon.svg'

import '../app/soundController'
import '../app/keyShortcuts'
import '../app/notifications'
import { playSound } from '../app/soundController'
import Footer from '../components/Footer'
import findNextElementInArray from '../common/findNextElementInArray'
import { resetBtnPress, historyBtnPress } from '../app/buttonActions'
import { requestNotificationPermition } from '../app/notifications'

function PomodoroPage() {
  const types = ['pomodoro', 'shortRest', 'longRest']
  const modes = ['auto', 'single']
  const pomStatus = useSelector((state) => state.timer.status)
  const pomType = useSelector((state) => state.timer.type)
  const pomMode = useSelector((state) => state.timer.mode)
  const pomHistShown = useSelector((state) => state.timer.historyShown)

  const pomTimeline = useSelector((state) => state.timer.timeline)
  const Dispatch = useDispatch()

  return (
    <div className='container'>
      <Helmet></Helmet>
      <h1>Pomodoro Timer</h1>
      <Display />
      <div className='buttons'>
        <div className='buttons-column'>
          <div className='smallBtn'>
            <div className='label'> RESET/ MODE</div>
            <button
              onClick={() => {
                resetBtnPress(
                  playSound,
                  pomStatus,
                  Dispatch,
                  reset,
                  mode,
                  type,
                  pomMode,
                  modes,
                  pomTimeline,
                )
              }}></button>
          </div>
          <div className='tinyBtn '>
            <div className='label'>
              <HistoryIcon />
            </div>
            <button
              className={`${pomHistShown ? 'active' : 'inactive'}`}
              onMouseDown={() => {
                historyBtnPress(playSound, Dispatch, pomHistShown, setHistShown)
              }}></button>
          </div>
        </div>
        <button
          className='mainBtn'
          onClick={() => {
            Dispatch(setHistShown(false))

            if (pomStatus === 'running') {
              playSound(3)
              Dispatch(pause())
            } else if (pomStatus === 'ended') {
              playSound(1)
              Dispatch(next())
            } else {
              playSound(4)
              Dispatch(start())
            }
          }}>
          <PlayIcon className={`mainBtn__icon ${pomStatus}`} />
        </button>
        <div className='buttons-column'>
          <div className='smallBtn'>
            <div className='label'>
              <SkipIcon />
            </div>
            <button
              onClick={() => {
                playSound(2)
                if (pomMode === 'single') {
                  Dispatch(type(findNextElementInArray(pomType, types)))
                } else if (pomMode === 'auto') {
                  Dispatch(reset())
                  Dispatch(next())
                }
              }}></button>
          </div>
          <div className='tinyBtn '>
            <div className='label'>
              <NotificationIcon />
            </div>
            <button
              className={`${
                Notification.permission === 'granted' ? 'active' : 'inactive'
              }`}
              onMouseDown={() => {
                playSound(1)
                requestNotificationPermition()
              }}></button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default PomodoroPage
