const Sequelize = require('sequelize')

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE
})

database
    .authenticate()
    .then(() => {
        console.log('Connection to the Database has been establised')
    })
    .catch(err => {
        console.error('Unable to connect: ' + err)
    })

module.exports = database