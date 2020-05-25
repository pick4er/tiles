
// undefined if arr1 is subset of arr2
// true if arr1 has same elements as arr2
// false if arr1 has at least an element that arr2 does not

/* eslint-disable-next-line max-len */
export default <T extends (string | number)>(arr1: T[], arr2: T[]): boolean | undefined => {
  const differentVal: T | undefined =
    arr1.find((val1: T) => {
      if (arr2.indexOf(val1) === -1) {
        return true;
      }

      return false;
    })

  if (typeof differentVal !== 'undefined') {
    return false;
  }

  if (arr1.length < arr2.length) {
    return undefined;
  }

  return true;
};
