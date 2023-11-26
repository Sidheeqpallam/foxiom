const express = require('express')
require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const utility = require('./helpers/utility')
const { MSG } = require('./helpers/constants/constants')

const indexRouter = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(cors())

app.use(
  morgan('dev', {
    skip: (req) => req.originalUrl === '/health-check',
  }),
)

app.use(
  express.json({
    limit: '100mb',
    extended: true,
  }),
)
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: false,
  }),
)

app.use(express.static(path.join(__dirname, 'public')))

// Database connection
const mongoURI = process.env.MONGODB_URL

mongoose.connect(mongoURI, {
  writeConcern: {
    w: 'majority',
    wtimeout: 3000, // Optional write concern timeout in milliseconds
  },
})
  .then((res) => console.log("mongodb connected"))
  .catch((err) => console.log(err))

app.use('/', indexRouter)

app.use('/health-check', (_req, res) => {
  res.status(200).send('Healthy')
})

// catch 404 and forward to error handler
app.use((req, res, _next) => {
  res.status(404).send(utility.errorRes(MSG.notFound))
})

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', err)
})

module.exports = app
