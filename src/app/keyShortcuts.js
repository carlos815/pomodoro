import { store } from '../app/store'
import { start, mode, type, pause, next, reset } from '../features/timerSlice'
import { alarm, playSound } from './soundController'

let keysPressed = {}

document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true
  alarm.pause()
  alarm.currentTime = 0

  // if (keysPressed['Control']) { //uncomment this to add support to multiple key listener

  switch (event.key) {
    case 'p' || 'P':
      event.preventDefault()
      store.dispatch(type('pomodoro'))
      store.dispatch(mode('single'))
      store.dispatch(start())
      playSound(1)
      break
    case 'l' || 'L':
      event.preventDefault()
      store.dispatch(type('longRest'))
      store.dispatch(mode('single'))
      store.dispatch(start())
      playSound(1)
      break
    case 's' || 'S':
      event.preventDefault()
      store.dispatch(type('shortRest'))
      store.dispatch(mode('single'))
      store.dispatch(start())
      playSound(1)
      break
    case 'r' || 'R':
      store.dispatch(reset())
      playSound(1)
      break
    case ' ':
      event.preventDefault()
      playSound(1)
      const pomStatus = store.getState().timer.status

      if (pomStatus === 'running') {
        store.dispatch(pause())
      } else if (pomStatus === 'ended') {
        store.dispatch(next())
      } else {
        store.dispatch(start())
      }
      break
    default:
      break
  }
  // }
})

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key]
})
