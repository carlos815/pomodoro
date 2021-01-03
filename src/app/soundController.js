import alarmSound from '../assets/sounds/digital-tone.wav'
import beepSound from '../assets/sounds/beep.wav'

import { subscribe } from 'redux-subscriber'

export const alarm = new Audio(alarmSound)
export const beep = new Audio(beepSound)

const stopSound = (sound) => {
  sound.pause()
  sound.currentTime = 0
}

alarm.volume = 0.3
beep.volume = 0.3
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

subscribe('timer.status', (state) => {
  if (state.timer.status === 'ended') {
    alarm.play()
  } else {
    stopSound(alarm)
  }
})

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    stopSound(alarm)
  }
})

document.addEventListener('click', function () {
  stopSound(alarm)
})
