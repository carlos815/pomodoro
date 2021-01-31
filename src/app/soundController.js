import alarmFile from '../assets/sounds/alarm.ogg'
import acceptFile from '../assets/sounds/accept.ogg'
import backFile from '../assets/sounds/back.ogg'
import pauseFile from '../assets/sounds/pause.ogg'
import playFile from '../assets/sounds/play.ogg'
import { store } from '../app/store'
import { setSoundAvailable } from '../features/timerSlice'
import { subscribe } from 'redux-subscriber'
import { displayNotification } from './notifications'

export const alarm = new Audio(alarmFile)
export const beep = new Audio(acceptFile)

var ns = 4 //The number of sounds to preload. This depends on how  often the sounds need to be played, but if too big it will probably cause lond loading times.
var sounds = [] //This will be a matrix of all the sounds

for (
  let i = 0;
  i < ns;
  i++ //We need to have ns different copies of each sound, hence:
)
  sounds.push([])
let soundSources = [alarmFile, acceptFile, backFile, pauseFile, playFile]

for (let i = 0; i < soundSources.length; i++)
  for (let j = 0; j < ns; j++) sounds[j].push(new Audio(soundSources[i])) //Assuming that you hold your sound sauces in a "sources" array, for example ["bla.wav", "smile.dog" "scream.wav"]

var playing = [] //This will be our play index, so we know which version has been played the last.

for (let i = 0; i < soundSources.length; i++) playing[i] = 0

export const playSound = function (
  id,
  vol = 0.15, //id in the sounds[i] array., vol is a real number in the [0, 1] interval
) {
  if (vol <= 1 && vol >= 0) sounds[playing[id]][id].volume = vol
  else sounds[playing[id]][id].volume = 1
  sounds[playing[id]][id].currentTime = 0
  sounds[playing[id]][id]
    .play()
    .then(() => {
      store.dispatch(setSoundAvailable(true))
    })
    .catch((e) => {
      store.dispatch(setSoundAvailable(false))
    })
  ++playing[id] //Each time a sound is played, increment this so the next time that sound needs to be played, we play a different version of it,

  if (playing[id] >= ns) playing[id] = 0
}

const stopSound = (sound) => {
  sound.pause()
  sound.currentTime = 0
}

alarm.volume = 0.3
beep.volume = 0.15
if (typeof alarm.loop === 'boolean') {
  alarm.loop = true
} else {
  alarm.addEventListener(
    'ended',
    function () {
      this.currentTime = 0
      this.play()
        .then(() => {
          store.dispatch(setSoundAvailable(true))
        })
        .catch((e) => {
          store.dispatch(setSoundAvailable(false))
        })
    },
    false,
  )
}

const unsubscribe = subscribe('timer.status', (state) => {
  //This mess is here to prevent an infinite loop triggered by some bug (I think) in the subscribe library
  //The timerEndRoutine triggers this subscribe function, even though it doesn't modify the 'timer.status' value specified in the key 🤷,
  //Triggering the subscribe function runs the timerEndRoutine again which triggers the subscriber function again...
  //To prevent that loop we need to unsubscribe befor running the timerEndRoutine.
  //The timerEndRoutine then, creates a new subscription and no harm done.
  unsubscribe()
  timerEndRoutine(state)
})

function timerEndRoutine(state) {
  if (state.timer.status === 'ended') {
    alarm
      .play()
      .then(() => {
        store.dispatch(setSoundAvailable(true))
      })
      .catch((e) => {
        store.dispatch(setSoundAvailable(false))
      })
    displayNotification('Timer Ended!')
    subscribe()
  } else {
    stopSound(alarm)
  }
  const unsubscribe = subscribe('timer.status', (state) => {
    unsubscribe()
    timerEndRoutine(state)
  })
}

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    stopSound(alarm)
  }
})

document.addEventListener('click', function () {
  stopSound(alarm)
})

window.onload = function () {
  //reproduce un sonido de silencio para ver si el navegador deja reproducir sonidos
  //La funcion playSound se encarga de reportar al redux si falla
  playSound(1, 0)
}
