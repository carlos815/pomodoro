import React from 'react'
import { Helmet } from 'react-helmet'

import Display from '../components/Display'
import { start, pause, reset, mode, type, next } from '../features/timerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as SkipIcon } from '../assets/images/skip-icon.svg'
import { ReactComponent as PlayIcon } from '../assets/images/play-icon.svg'
import '../app/soundController'
import '../app/keyShortcuts'

import { beep } from '../app/soundController'
import Footer from '../components/Footer'

function PomodoroPage() {
  const types = ['pomodoro', 'shortRest', 'longRest']
  const modes = ['auto', 'single']

  const pomStatus = useSelector((state) => state.timer.status)
  const pomType = useSelector((state) => state.timer.type)
  const pomMode = useSelector((state) => state.timer.mode)
  const findNextElementInArray = (currentElement, array) => {
    const currentElementIndex = array.findIndex((el) => el === currentElement)
    return array[currentElementIndex + 1]
      ? array[currentElementIndex + 1]
      : array[0]
  }

  const Dispatch = useDispatch()
  return (
    <div className='container'>
      <Helmet></Helmet>
      <h1>Pomodoro Timer</h1>

      <Display />

      <div className='buttons'>
        <div className='smallBtn reset'>
          <div className='label'> RESET/ MODE</div>
          <button
            className=' reset'
            onClick={() => {
              beep.play()

              if (pomStatus !== 'idle') {
                Dispatch(reset())
                return
              }
              Dispatch(mode(findNextElementInArray(pomMode, modes)))
            }}></button>
        </div>

        <button
          className='mainBtn'
          onClick={() => {
            beep.play()

            if (pomStatus === 'running') {
              Dispatch(pause())
            } else if (pomStatus === 'ended') {
              Dispatch(next())
            } else {
              Dispatch(start())
            }
          }}>
          <PlayIcon className={`mainBtn__icon ${pomStatus}`} />
        </button>
        <div className='smallBtn next'>
          <SkipIcon className='label' />
          <button
            className=' switch'
            onClick={() => {
              beep.play()
              if (pomMode === 'single') {
                Dispatch(type(findNextElementInArray(pomType, types)))
              } else if (pomMode === 'auto') {
                Dispatch(reset())
                Dispatch(next())
              }
            }}></button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default PomodoroPage
