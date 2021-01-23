import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ended } from '../features/timerSlice'
import { minDigits } from '../common/minDigits'
import { areSameDay } from '../common/isSameDay'

function Counter() {
  const [nowDate, setNowDate] = useState(Date.now())
  const Dispatch = useDispatch()

  const pomStart = useSelector((state) => state.timer.start)
  const pomStatus = useSelector((state) => state.timer.status)
  const pomSetTo = useSelector((state) => state.timer.setTo)
  const pomTotal = useSelector((state) => state.timer.total)
  const pomType = useSelector((state) => state.timer.type)
  const pomHistory = useSelector((state) => state.timer.history)
  const pomHistoryShown = useSelector((state) => state.timer.historyShown)

  let pomTotalDateObj

  if (pomStatus === 'running') {
    //When the timer is running, the total time is calculated on each render
    const pomTotalLocal = nowDate - pomStart
    const timeLeft = pomSetTo - pomTotalLocal
    if (timeLeft < 0) {
      Dispatch(ended())
    }

    pomTotalDateObj = new Date(timeLeft)
  } else {
    //When the timer is paused, the total time is read from redux
    pomTotalDateObj = new Date(pomSetTo - pomTotal)
  }

  const mins = minDigits(pomTotalDateObj.getUTCMinutes().toString(), 2)
  const secs = minDigits(pomTotalDateObj.getUTCSeconds().toString(), 2)

  let counter = pomHistoryShown
    ? `P0:${minDigits(
        pomHistory
          .filter(
            (entry) =>
              entry.type === 'pomodoro' &&
              areSameDay(new Date(), new Date(entry.timestamp)),
          )
          .length.toString(),
        2,
      )}`
    : `${mins}:${secs}`
  /* switch (pomMode) {
    case 'single' || 'auto':
      counter = `${mins}:${secs}`
      break
    case 'histPom':
      counter = `P0:${minDigits(
        pomHistory
          .filter(
            (entry) =>
              entry.type === 'pomodoro' &&
              areSameDay(new Date(), new Date(entry.timestamp)),
          )
          .length.toString(),
        2,
      )}`
      break
    case 'histLongR':
      counter = `L0:${minDigits(
        pomHistory
          .filter(
            (entry) =>
              entry.type === 'longRest' &&
              areSameDay(new Date(), new Date(entry.timestamp)),
          )
          .length.toString(),
        2,
      )}`
      break
    case 'histShortR':
      counter = `SH:${minDigits(
        pomHistory
          .filter(
            (entry) =>
              entry.type === 'shortRest' &&
              areSameDay(new Date(), new Date(entry.timestamp)),
          )
          .length.toString(),
        2,
      )}`
      break
    default:
      break
  }*/

  const title = (pomStatus, pomType, counter) => {
    //This updates the browser tab title
    let result = 'Pomodoro'
    switch (pomStatus) {
      case 'running':
        switch (pomType) {
          case 'pomodoro':
            result = `${counter} - Pomodoro`
            break
          case 'longRest':
            result = `${counter} - Long Break`
            break
          case 'shortRest':
            result = `${counter} - Short Break`
            break
          default:
            break
        }
        break
      case 'idle':
        result = `Pomodoro Timer`
        break
      case 'paused':
        result = `${counter} - Paused`
        break
      case 'ended':
        switch (pomType) {
          case 'pomodoro':
            result = `Time for a break!`
            break
          case 'longRest':
            result = `Break over`
            break
          case 'shortRest':
            result = `Break over`
            break
          default:
            break
        }
        break
      default:
        break
    }
    return result
  }
  document.title = title(pomStatus, pomType, counter)

  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <h2 className='counter '>
      <span className={`display--active ${pomStatus}`}>{counter}</span>
    </h2>
  )
}

export default Counter
