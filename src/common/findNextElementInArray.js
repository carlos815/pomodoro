const findNextElementInArray = (currentElement, array) => {
  const currentElementIndex = array.findIndex((el) => el === currentElement)
  return array[currentElementIndex + 1]
    ? array[currentElementIndex + 1]
    : array[0]
}

export default findNextElementInArray
