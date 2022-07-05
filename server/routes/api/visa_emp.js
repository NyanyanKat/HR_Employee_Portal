const router = require('express').Router();
const formidable = require("formidable")
const Visa = require('../../model/Visa')

router.get('/:eid', async (req, res) => {
    try {
        const visa = await Visa.findOne({ userID: req.params.eid })
        // console.log(visa)
        const visaInfo = {
            opt: [visa.EAD, visa.I983, visa.I20],
            status: visa.status,
            userID: visa.userID
        }
        // console.log(visaInfo)
        res.status(200).send(visaInfo)
    } catch (error) {
        // console.log(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const form = new formidable.IncomingForm()
        form.parse(req, async (errs, fields, files) => {
            // console.log('fields', fields)

            const phaseNum = fields.status
            // console.log("phaseNum", phaseNum)
            switch (phaseNum) {
                case "1":
                    await Visa.updateOne({ userID: fields.eid }, {
                        EAD: {
                            file: {
                                fileName: fields['fileInfo.name'],
                                fileType: fields['fileInfo.type'],
                                dataURI: fields['fileInfo.url']
                            },
                            status: "pending"
                        }
                    })
                    res.status(200).send('update EAD Card successfully!')
                    break;

                case "2":
                    await Visa.updateOne({ userID: fields.eid }, {
                        I983: {
                            file: {
                                fileName: fields['fileInfo.name'],
                                fileType: fields['fileInfo.type'],
                                dataURI: fields['fileInfo.url']
                            },
                            status: "pending"
                        }
                    })
                    res.status(200).send('update EAD Card successfully!')
                    break;

                case "3":
                    await Visa.updateOne({ userID: fields.eid }, {
                        I20: {
                            file: {
                                fileName: fields['fileInfo.name'],
                                fileType: fields['fileInfo.type'],
                                dataURI: fields['fileInfo.url']
                            },
                            status: "pending"
                        }
                    })
                    res.status(200).send('update I983 Form successfully!')
                    break;

                default:
                    break;
            }

        })
    } catch (error) {
        // console.log(error)
        res.status(500).send(err)
    }
})

module.exports = router;