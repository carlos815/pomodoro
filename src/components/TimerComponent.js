import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { start, pause, reset } from '../features/timerSlice'
import { minDigits } from '../common/minDigits'

function TimerComponent() {
  const [nowDate, setNowDate] = useState(Date.now())

  const timerStart = useSelector((state) => state.timer.start)
  const timerStatus = useSelector((state) => state.timer.status)
  const timerSetTo = useSelector((state) => state.timer.setTo)
  const timerTotal = useSelector((state) => state.timer.total)
  const timerShortRestDuration = useSelector(
    (state) => state.timer.shortRestDuration,
  )
  const timerLongRestDuration = useSelector(
    (state) => state.timer.longRestDuration,
  )
  const timerPomodoroDuration = useSelector(
    (state) => state.timer.pomodoroDuration,
  )

  let timerTotalDateObj
  if (timerStatus === 'running') {
    //When the timer is running, the total time is calculated on each render
    const timerTotalLocal = nowDate - timerStart
    timerTotalDateObj = new Date(timerSetTo - timerTotalLocal)
  } else {
    //When the timer is paused, the total time is read from redux
    timerTotalDateObj = new Date(timerSetTo - timerTotal)
  }

  /* This makes the component auto update with requestAnimationFrame --->>>*/
  const requestRef = useRef()
  const previoustimeref = useRef()
  const animate = (time) => {
    if (previoustimeref.current != undefined) {
      setNowDate(Date.now())
    }
    previoustimeref.current = time
    requestRef.current = requestAnimationFrame(animate)
  }
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])
  /* <<<---This makes the component auto update with requestAnimationFrame*/
  const hours = minDigits(timerTotalDateObj.getUTCHours().toString(), 2)
  const mins = minDigits(timerTotalDateObj.getUTCMinutes().toString(), 2)
  const secs = minDigits(timerTotalDateObj.getUTCSeconds().toString(), 2)
  const mills = minDigits(timerTotalDateObj.getUTCMilliseconds().toString(), 3)

  const Dispatch = useDispatch()
  return (
    <div>
      <h1>This is a Timer</h1>
      <h2>
        {mins}:{secs}
      </h2>
      <button
        onClick={() => {
          timerStatus === 'running'
            ? Dispatch(pause())
            : Dispatch(start(timerPomodoroDuration))
        }}>
        {timerStatus === 'running' ? 'Pause' : 'Play Pomodoro'}
      </button>{' '}
      <button
        onClick={() => {
          timerStatus === 'running'
            ? Dispatch(pause())
            : Dispatch(start(timerLongRestDuration))
        }}>
        {timerStatus === 'running' ? 'Pause' : 'Long Rest'}
      </button>{' '}
      <button
        onClick={() => {
          timerStatus === 'running'
            ? Dispatch(pause())
            : Dispatch(start(timerShortRestDuration))
        }}>
        {timerStatus === 'running' ? 'Pause' : 'Short Rest'}
      </button>
      {timerTotal !== 0 && !timerStatus ? (
        <button
          onClick={() => {
            Dispatch(reset())
          }}>
          Reset
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default TimerComponent
