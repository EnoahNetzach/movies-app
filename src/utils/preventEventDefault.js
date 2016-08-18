export default callback => event => {
  event.preventDefault()
  callback(event)
}
