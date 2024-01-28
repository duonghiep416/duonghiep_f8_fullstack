const QRCode = require('qrcode')

module.exports = async (url) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, (err, qrCodeUrl) => {
      if (err) {
        reject(err)
      } else {
        resolve(qrCodeUrl)
      }
    })
  })
}
