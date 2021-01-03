import alarmSound from '../assets/sounds/alarm.ogg'
import beepSound from '../assets/sounds/tone.ogg'

import { subscribe } from 'redux-subscriber'

export const alarm = new Audio(alarmSound)
export const beep = new Audio(beepSound)

var ns = 4 //The number of sounds to preload. This depends on how often the sounds need to be played, but if too big it will probably cause lond loading times.
var sounds = [] //This will be a matrix of all the sounds

for (
  let i = 0;
  i < ns;
  i++ //We need to have ns different copies of each sound, hence:
)
  sounds.push([])
let soundSources = [beepSound]
for (let i = 0; i < soundSources.length; i++)
  for (let j = 0; j < ns; j++) sounds[j].push(new Audio(soundSources[i])) //Assuming that you hold your sound sauces in a "sources" array, for example ["bla.wav", "smile.dog" "scream.wav"]

var playing = [] //This will be our play index, so we know which version has been played the last.

for (let i = 0; i < soundSources.length; i++) playing[i] = 0

export const playSound = function (
  id,
  vol, //id in the sounds[i] array., vol is a real number in the [0, 1] interval
) {
  if (vol <= 1 && vol >= 0) sounds[playing[id]][id].volume = vol
  else sounds[playing[id]][id].volume = 1

  sounds[playing[id]][id].play()
  ++playing[id] //Each time a sound is played, increment this so the next time that sound needs to be played, we play a different version of it,

  if (playing[id] >= ns) playing[id] = 0
}

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
