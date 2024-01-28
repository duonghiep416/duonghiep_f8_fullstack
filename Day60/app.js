require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var roleRouter = require('./routes/role')
var authRouter = require('./routes/auth')
var shortenUrlRouter = require('./routes/shorten-url')
var session = require('express-session')
var expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const localPassport = require('./passports/local.passport')
const googlePassport = require('./passports/google.passport')
const flash = require('connect-flash')
const { User } = require('./models/index')
const authMiddleware = require('./middlewares/auth.middleware')
const guestMiddleware = require('./middlewares/guest.middleware')

var app = express()
app.use(
  session({
    secret: 'duonghiep',
    resave: false,
    saveUninitialized: true
  })
)
app.use(flash())

// Cấu hình passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  const email = user.email || user.emails[0].value
  done(null, email)
})

passport.deserializeUser(async (email, done) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  done(null, user)
})

passport.use('local', localPassport)
passport.use('google', googlePassport)

passport // view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', guestMiddleware, authRouter)

// Gọi auth.middleware
app.use(authMiddleware)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/role', roleRouter)
app.use('/shorten-url', shortenUrlRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
