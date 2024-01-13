module.exports = {
  detectBrowser: (req) => {
    const userAgent = req.headers['user-agent']
    const browser = require('ua-parser-js')(userAgent).browser
    return browser
  },
  detectOS: (req) => {
    const userAgent = req.headers['user-agent']
    const os = require('ua-parser-js')(userAgent).os
    return os
  }
}
