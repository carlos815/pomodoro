import findNextElementInArray from '../common/findNextElementInArray'

export const resetBtnPress = (
  playSoundFn,
  pomStatus,
  dispatchFn,
  resetAction,
  modeAction,
  typeAction,
  currentPomMode,
  modesArray,
  pomTimeline,
) => {
  playSoundFn(1, 0.3)
  if (pomStatus !== 'idle') {
    dispatchFn(resetAction())
    return
  }
  dispatchFn(modeAction(findNextElementInArray(currentPomMode, modesArray)))
  dispatchFn(typeAction(pomTimeline[0]))
}
export const historyBtnPress = (
  playSoundFn,
  dispatchFn,
  pomHistShown,
  setHistShown,
) => {
  if (pomHistShown == true) {
    playSoundFn(2)
  } else {
    playSoundFn(1)
  }
  dispatchFn(setHistShown())
}
