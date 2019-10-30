const express   = require('express')
const morgan    = require('morgan')
const app       = express()

const routes    = require('./routes/index')


// Middlewares
app.set('port', process.env.PORT || 3000)
app.use(morgan('combined'))

// Routes
app.use(routes)

// Start the App
app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`)
})