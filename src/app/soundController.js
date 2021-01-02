import alarmSound from '../assets/sounds/digital-tone.wav'
import beepSound from '../assets/sounds/beep.wav'

import { subscribe } from 'redux-subscriber'

export const alarm = new Audio(alarmSound)
export const beep = new Audio(beepSound)

if (typeof alarm.loop === 'boolean') {
  alarm.loop = true
} else {
  alarm.addEventListener(
    'ended',
    function () {
      this.currentTime = 0
      this.play()
    },
    false,
  )
}

const unsubscribe = subscribe('timer', (state) => {
  if (state.timer.status === 'ended') {
    alarm.play()
  } else {
    alarm.pause()
    alarm.currentTime = 0
  }
})