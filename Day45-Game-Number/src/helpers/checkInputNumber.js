function isNumberInRange(input, min, max) {
  const isNumeric = /^[0-9]+$/.test(input)
  const isInRange =
    isNumeric && parseInt(input, 10) >= min && parseInt(input, 10) <= max
  return isInRange
}
export default isNumberInRange
