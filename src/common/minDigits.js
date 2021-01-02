export const minDigits = (numStr, length) => {
  while (numStr.length < length) {
    numStr = '0' + numStr
  }
  return numStr
}
