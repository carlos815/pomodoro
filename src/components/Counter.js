import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ended } from '../features/timerSlice'
import { minDigits } from '../common/minDigits'

function Counter() {
  const [nowDate, setNowDate] = useState(Date.now())
  const Dispatch = useDispatch()

  const pomStart = useSelector((state) => state.timer.start)
  const pomStatus = useSelector((state) => state.timer.status)
  const pomSetTo = useSelector((state) => state.timer.setTo)
  const pomTotal = useSelector((state) => state.timer.total)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const mins = minDigits(pomTotalDateObj.getUTCMinutes().toString(), 2)
  const secs = minDigits(pomTotalDateObj.getUTCSeconds().toString(), 2)
  return (
    <h2 className='counter '>
      <span className={`display--active ${pomStatus}`}>
        {mins}:{secs}
      </span>
    </h2>
  )
}

export default Counter
