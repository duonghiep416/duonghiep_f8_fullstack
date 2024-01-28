function hasIdInPath(path) {
  var pattern = /^\/shorten-url\/[^/]+$/
  var match = path.match(pattern)
  return !!match
}
module.exports = (req, res, next) => {
  const originalUrl = req.originalUrl
  if (req.user || hasIdInPath(originalUrl)) {
    return next()
  }
  return res.redirect('/auth/login')
}
