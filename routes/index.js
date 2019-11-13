const router    = require('express').Router()
const multer    = require('multer')
const csv       = require('csvtojson')

const database  = require('../database/config')

const upload    = multer({ dest: 'static/uploads/' })

router.get('/', (req, res) => res.render('index'))

router.post('/csv/execute', upload.any(), async (req, res) => {
    const files = req.files
    const headers = req.body ? req.body.headersInput : null
    const csvFile1 = files[0]['path']
    
    let csvOutputFile1 = await csv().fromFile(csvFile1)
    try {
        let count = 0, newCsv = null
        do {
            const row = csvOutputFile1[count]
            let pac = await database.query(`select pacid, codigo from tpacientes where codigo = ${row['T12Cedula']}`, { type: database.QueryTypes.SELECT })
            let filteredRows = csvOutputFile1.filter(v => v['T12Cedula'] === pac[0].codigo)
            if (pac.length > 0) {
                if (newCsv) {
                    if (!newCsv[count]) {
                        newCsv[count] = {
                            'T12Cedula': row['T12Cedula']
                        }
                    }
                }
            }
            count++
        } while ( count < csvOutputFile1.length )


        // const pac = await database.query(`select pacid, codigo from tpacientes where codigo = '${csvOutputFile1[1]['T10Cedula']}'`, { type: database.QueryTypes.SELECT })
        // if (pac.length > 0) {
        //     const csvFiltered1 = csvOutputFile1.filter(v => v['T10Cedula'] === pac[0].codigo)
        //     const csvFiltered2 = csvOutputFile2.filter(v => v['T12Cedula'] === pac[0].codigo)
        //     let sumValor = 0, sumAbono = 0
        //     csvFiltered1.forEach((val, idx) => {
        //         sumValor += parseInt(val['T10Valor']) - parseInt(val['T10Descuento'])
        //     })
        //     csvFiltered2.forEach((val, idx) => {
        //         if (val['T12TipoAbono'].indexOf('Abono') != -1) {
        //             sumAbono += parseInt(val['T12ValorAbono'])
        //         }
        //     })
        //     console.log(sumValor, sumAbono)
        // }
    } catch (err) {
        console.log(err)
    }

    // res.attachment('export.csv')
    // res.status(200).send(headers)
})


router.get('/pacientes', async (req, res) => {
    // try {
    //     const pacs = await database.query("SELECT pacid,codigo,nom1,nom2,ape1,ape2 FROM tpacientes")
    //     if (pacs.length > 0) {
    //         res.status(200).send({
    //             error: false,
    //             results: pacs[0]
    //         })
    //     }
    // } catch(err) {
    //     res.status(402).send({
    //         error: true,
    //         msg: 'No rows found'
    //     })
    // }
    
    
})


module.exports = router