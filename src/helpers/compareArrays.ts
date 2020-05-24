
// undefined if arr1 is subset of arr2
// true if arr1 has same elements as arr2
// false if arr1 has at least an element that arr2 does not
export default (arr1: (string | number)[], arr2: (string | number)[]): boolean | undefined => {
  for (let val1 of arr1) {
    if (arr2.indexOf(val1) === -1) {
      return false
    }
  }

  if (arr1.length < arr2.length) {
    return undefined
  }

  return true
}
