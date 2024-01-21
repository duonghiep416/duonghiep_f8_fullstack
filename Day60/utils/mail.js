const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})
const sendMail = async (to, subject, message) => {
  const info = await transporter.sendMail({
    from: `"Dương Hiệp" <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    html: `Vui lòng ấn vào nút dưới đây để đặt lại mật khẩu: 
    <a href="${message}" style="display: block;
      padding: 10px;
      color: #fff;
      background-color: green;
      text-align: center;
      width: 200px;
      text-decoration: none;
      border-radius: 10px;
      margin: 20px auto;
      font-size: 17px;"
    >
      Đặt lại mật khẩu
    </a>`
  })
  return info
}
module.exports = sendMail
