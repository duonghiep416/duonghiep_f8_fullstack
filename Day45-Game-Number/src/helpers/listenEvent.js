function listenEvent(table, inputNumber) {
  window.addEventListener('keydown', (event) => {
    console.log(event, table, inputNumber)
  })
}
export default listenEvent
