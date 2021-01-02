import React from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as TomatoIcon } from '../assets/images/tomato-icon.svg'
import { ReactComponent as RestIcon } from '../assets/images/rest-icon.svg'
import Timeline from './Timeline'
import Counter from './Counter'

function Display() {
  const pomType = useSelector((state) => state.timer.type)
  const pomMode = useSelector((state) => state.timer.mode)

  return (
    <div className='display'>
      <div className='display__mode'>
        <ul>
          <li
            className={`display--${
              pomMode === 'auto' ? 'active' : 'inactive'
            }`}>
            AUTO
          </li>
          <li
            className={`display--${
              pomMode === 'single' ? 'active' : 'inactive'
            }`}>
            SINGLE
          </li>
        </ul>
      </div>

      <div className='display__center'>
        <div
          className={`display__tomato display__status display--${
            pomType !== 'pomodoro' ? 'inactive' : 'active'
          }`}>
          <TomatoIcon />
          <ul>
            <li>POM</li>
          </ul>
        </div>
        <Counter />

        <div className='display__sleep  display__status'>
          <RestIcon
            className={`display--${
              pomType === 'longRest' || pomType === 'shortRest'
                ? 'active'
                : 'inactive'
            }`}
          />
          <ul>
            <li
              className={`display--${
                pomType === 'longRest' ? 'active' : 'inactive'
              }`}>
              LONG
            </li>
            <li
              className={`display--${
                pomType === 'shortRest' ? 'active' : 'inactive'
              }`}>
              SHORT
            </li>
          </ul>
        </div>
      </div>
      <Timeline pomMode={pomMode} />
    </div>
  )
}

export default Display
