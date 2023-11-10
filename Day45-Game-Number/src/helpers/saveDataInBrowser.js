function saveDataInBrowser(type, data) {
  localStorage.setItem(type, JSON.stringify(data))
}

export default saveDataInBrowser
