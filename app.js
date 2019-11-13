const express   = require('express')
const morgan    = require('morgan')
const path      = require('path')
const app       = express()

require('dotenv').config()

const routes    = require('./routes/index')


// Config
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Middlewares
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'static')))

// Routes
app.use(routes)

// Start the App
app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`)
})