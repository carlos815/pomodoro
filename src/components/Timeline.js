import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as RestIndicator } from '../assets/images/rest-tl.svg'
import { ReactComponent as PomIndicator } from '../assets/images/pomodoro-tl.svg'
import { areSameDay } from '../common/isSameDay'

function Timeline(props) {
  const timeline = useSelector((state) => state.timer.timeline)
  const pomMode = useSelector((state) => state.timer.mode)
  const history = useSelector((state) => state.timer.history)
  const pomHistoryShown = useSelector((state) => state.timer.historyShown)

  const isPomIndicatorActive = (timerMode, itemType, pomHistoryShown) => {
    if (
      (pomHistoryShown === true || timerMode !== 'single') &&
      itemType === 'pomodoro'
    ) {
      return true
    }
    return false
  }
  const isRestIndicatorOneActive = (timerMode, itemType, pomHistoryShown) => {
    if (
      (pomHistoryShown === true || timerMode !== 'single') &&
      (itemType === 'shortRest' || itemType === 'longRest')
    ) {
      return true
    }
    return false
  }
  const isRestIndicatorTwoActive = (timerMode, itemType, pomHistoryShown) => {
    if (
      (pomHistoryShown === true || timerMode !== 'single') &&
      itemType === 'longRest'
    ) {
      return true
    }
    return false
  }
  const isItemBorderActive = (timerMode, itemType, pomHistoryShown, index) => {
    if (index === 0 && timerMode === 'auto' && pomHistoryShown === false) {
      return true
    } else if (itemType === 'pomodoro' && pomHistoryShown === true) {
      return true
    }
    return false
  }

  let timelineSelected = []

  if (pomHistoryShown === true) {
    const Today = new Date()
    timelineSelected = history
      .filter((element) => areSameDay(Today, new Date(element.timestamp)))
      .map((element) => element.type)
      .reverse()
      .slice(0, 8)
  } else {
    timelineSelected = timeline
  }

  while (timelineSelected.length < 8) {
    timelineSelected.push('')
  }

  return (
    <div className='display__timeline'>
      {timelineSelected.map((item, index) => {
        return (
          <div
            key={index}
            className={`${item} display__timeline-item display__timeline-item--${pomMode}`}>
            <PomIndicator
              className={`display__timeline-item-pom display--${
                isPomIndicatorActive(pomMode, item, pomHistoryShown)
                  ? 'active'
                  : 'inactive'
              }`}
            />
            <RestIndicator
              className={`display__timeline-item-rest display--${
                isRestIndicatorOneActive(pomMode, item, pomHistoryShown)
                  ? 'active'
                  : 'inactive'
              }`}
            />
            <RestIndicator
              className={`display__timeline-item-rest display--${
                isRestIndicatorTwoActive(pomMode, item, pomHistoryShown)
                  ? 'active'
                  : 'inactive'
              }`}
            />
            <div
              className={`display__timeline-item-border display--${
                isItemBorderActive(pomMode, item, pomHistoryShown, index)
                  ? 'active'
                  : 'inactive'
              }
              `}></div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
