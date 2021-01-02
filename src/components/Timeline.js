import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as RestIndicator } from '../assets/images/rest-tl.svg'
import { ReactComponent as PomIndicator } from '../assets/images/pomodoro-tl.svg'

function Timeline(props) {
  const { pomMode } = props
  const timeline = useSelector((state) => state.timer.timeline)
  return (
    <div className='display__timeline'>
      {timeline.map((item, index) => {
        return (
          <div
            key={index}
            className={`${item} display__timeline-item display__timeline-item--${pomMode}`}>
            <PomIndicator
              className={`display__timeline-item-pom display--${
                pomMode !== 'single' && item === 'pomodoro'
                  ? 'active'
                  : 'inactive'
              }`}
            />
            <RestIndicator
              className={`display__timeline-item-rest display--${
                pomMode !== 'single' &&
                (item === 'shortRest' || item === 'longRest')
                  ? 'active'
                  : 'inactive'
              }`}
            />
            <RestIndicator
              className={`display__timeline-item-rest display--${
                pomMode !== 'single' && item === 'longRest'
                  ? 'active'
                  : 'inactive'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
