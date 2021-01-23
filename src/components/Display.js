import React from 'react'
import { useSelector } from 'react-redux'

import { ReactComponent as TomatoIcon } from '../assets/images/tomato-icon.svg'
import { ReactComponent as RestIcon } from '../assets/images/rest-icon.svg'
import { ReactComponent as HistIcon } from '../assets/images/history-icon.svg'

import Timeline from './Timeline'
import Counter from './Counter'

function Display() {
  const pomType = useSelector((state) => state.timer.type)
  const pomMode = useSelector((state) => state.timer.mode)
  const pomHistoryShown = useSelector((state) => state.timer.historyShown)

  return (
    <div className='display'>
      <div className='display__mode'>
        <ul>
          <li
            className={`display--${
              pomMode === 'auto' && pomHistoryShown === false
                ? 'active'
                : 'inactive'
            }`}>
            AUTO
          </li>
          <li
            className={`display--${
              pomMode === 'single' && pomHistoryShown === false
                ? 'active'
                : 'inactive'
            }`}>
            SINGLE
          </li>
          <li
            className={`
        display--${pomHistoryShown === true ? 'active' : 'inactive'}`}>
            <HistIcon
              className={`
        display--${pomHistoryShown === true ? 'active' : 'inactive'}`}
            />
            HISTORY
          </li>
        </ul>
      </div>

      <div className='display__center'>
        <div
          className={`display__tomato display__status display--${
            pomType === 'pomodoro' && pomHistoryShown === false
              ? 'active'
              : 'inactive'
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
              (pomType === 'longRest' || pomType === 'shortRest') &&
              pomHistoryShown === false
                ? 'active'
                : 'inactive'
            }`}
          />
          <ul>
            <li
              className={`display--${
                pomType === 'longRest' && pomHistoryShown === false
                  ? 'active'
                  : 'inactive'
              }`}>
              LONG
            </li>
            <li
              className={`display--${
                pomType === 'shortRest' && pomHistoryShown === false
                  ? 'active'
                  : 'inactive'
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
