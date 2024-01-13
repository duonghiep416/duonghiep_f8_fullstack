module.exports = {
  checkValidInfo: (req) => {
    const { username, password, confirmPassword } = req.body
    if (password && confirmPassword && password !== confirmPassword) {
      req.flash('error', 'Mật khẩu nhập lại không khớp')
      return false
    }
    if (password && password.length < 8) {
      req.flash('error', 'Mật khẩu cần tối thiểu 8 kí tự')
      return false
    }
    if (username && username.length < 5) {
      req.flash('error', 'Username cần tối thiểu 5 kí tự')
      return false
    }
    return true
  }
}
