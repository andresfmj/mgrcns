const router    = require('express').Router()
const multer    = require('multer')
const csv       = require('csvtojson')

const upload    = multer({ dest: 'static/uploads/' })

router.get('/', (req, res) => res.render('index'))

router.post('/csv/execute', upload.any(), async (req, res) => {
    const file = req.files[0]
    const headers = req.body ? req.body.headersInput : null
    const csvFile = file['path']

    let response = '', headersArr = headers.split(',')

    
    const csvOutput = await csv().fromFile(csvFile)
    csvOutput.forEach((val, idx) => {
        idx++
        response += idx + ',' + val[headersArr[idx-1]] + '\n'
    })

    console.log(response)

    // res.attachment('export.csv')
    // res.status(200).send(headers)
})


module.exports = router