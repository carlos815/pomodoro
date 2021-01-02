import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { start, pause, reset } from '../features/stopWatchSlice'
import { minDigits } from '../common/minDigits'

function StopWatchComponent() {
  const [nowDate, setNowDate] = useState(Date.now())

  const stopWatchStart = useSelector((state) => state.stopWatch.start)
  const stopWatchIsOn = useSelector((state) => state.stopWatch.isOn)
  const stopWatchTotal = useSelector((state) => state.stopWatch.total)
  const stopWatchHist = useSelector((state) => state.stopWatch.hist)

  let stopWatchTotalDateObj
  if (stopWatchIsOn) {
    //When the stopWatch is running, the total time is calculated on each render
    stopWatchTotalDateObj = new Date(nowDate - stopWatchStart)
  } else {
    //When the stopWatch is paused, the total time is read from redux
    stopWatchTotalDateObj = new Date(stopWatchTotal)
  }

  /* This makes the component auto update with requestAnimationFrame --->>>*/
  const requestRef = useRef()
  const previousstopWatchef = useRef()
  const animate = (time) => {
    if (previousstopWatchef.current != undefined) {
      setNowDate(Date.now())
    }
    previousstopWatchef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])
  /* <<<---This makes the component auto update with requestAnimationFrame*/

  const hours = minDigits(stopWatchTotalDateObj.getUTCHours().toString(), 2)
  const mins = minDigits(stopWatchTotalDateObj.getUTCMinutes().toString(), 2)
  const secs = minDigits(stopWatchTotalDateObj.getUTCSeconds().toString(), 2)
  const mills = minDigits(
    stopWatchTotalDateObj.getUTCMilliseconds().toString(),
    3,
  )

  const Dispatch = useDispatch()
  return (
    <div>
      <h1>This is a Stopwatch</h1>
      <h2>
        {hours}:{mins}:{secs}:{mills}
      </h2>

      <button
        onClick={() => {
          stopWatchIsOn ? Dispatch(pause()) : Dispatch(start())
        }}>
        {stopWatchIsOn ? 'Pause' : 'Play'}
      </button>
      {stopWatchTotal !== 0 && !stopWatchIsOn ? (
        <button
          onClick={() => {
            Dispatch(reset())
          }}>
          Reset
        </button>
      ) : (
        ''
      )}

      <div>
        {stopWatchHist.map((entry) => {
          const entryDateObj = new Date(entry)
          const hoursHist = minDigits(entryDateObj.getUTCHours().toString(), 2)
          const minsHist = minDigits(entryDateObj.getUTCMinutes().toString(), 2)
          const secsHist = minDigits(entryDateObj.getUTCSeconds().toString(), 2)
          const millsHist = minDigits(
            entryDateObj.getUTCMilliseconds().toString(),
            3,
          )
          return (
            <div>
              {hoursHist}:{minsHist}:{secsHist}:{millsHist}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StopWatchComponent
