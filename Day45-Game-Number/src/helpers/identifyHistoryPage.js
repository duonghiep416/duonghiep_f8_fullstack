const identifyHistoryPage = (type, tableRef) => {
  if (tableRef.current.scrollLeft) {
    const scrollLeft = tableRef.current.scrollLeft
    const offsetWidth = tableRef.current.offsetWidth
    if (type === 'roundDown') {
      const result = Math.floor(scrollLeft / offsetWidth)
      return result
    }
    if (type === 'roundUp') {
      const result = Math.ceil(scrollLeft / offsetWidth)
      return result
    }
  } else {
    return 0
  }
}

export default identifyHistoryPage
