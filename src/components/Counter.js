import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ended } from '../features/timerSlice'
import { minDigits } from '../common/minDigits'
import { Helmet } from 'react-helmet'

function Counter() {
  const [nowDate, setNowDate] = useState(Date.now())
  const Dispatch = useDispatch()

  const pomStart = useSelector((state) => state.timer.start)
  const pomStatus = useSelector((state) => state.timer.status)
  const pomSetTo = useSelector((state) => state.timer.setTo)
  const pomTotal = useSelector((state) => state.timer.total)
  const pomType = useSelector((state) => state.timer.type)

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
  const counter = `${mins}:${secs}`
  const title = (pomStatus, pomType, counter) => {
    console.log('asdf')
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
          case 'default':
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
          case 'default':
            break
        }
        break
    }
    return result
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  document.title = title(pomStatus, pomType, counter)
  return (
    <h2 className='counter '>
      <span className={`display--active ${pomStatus}`}>{counter}</span>
    </h2>
  )
}

export default Counter
