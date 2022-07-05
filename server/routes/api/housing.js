const router = require('express').Router();
const formidable = require("formidable")
const Housing = require('../../model/Housing');


router.get('/summary', async (req, res) => {
    const housing = await Housing.find({});
    return res.status(201).send(JSON.stringify(housing));
})

router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    //console.log('id', id)
    const housing = await Housing.findOne({_id: id});
    return res.status(201).send(JSON.stringify(housing));
})
router.post('/add', async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            const address = {
                houseNumber: fields['address.houseNumber'],
                streetName: fields['address.streetName'],
                city: fields['address.city'],
                state: fields['address.state'],
                zip: fields['address.zip'],
            }
            const landlord = {
                name: fields['landlord.name'],
                tel: fields['landlord.tel'],
                email: fields['landlord.email'],
            }
            const facilityInfo = {
                numBeds: fields['facilityInfo.numBeds'],
                numMattress: fields['facilityInfo.numMattress'],
                numTables: fields['facilityInfo.numTables'],
                numChairs: fields['facilityInfo.numChairs'],
            }

            // Housing.create(req.body);
            Housing.create({
                address: address,
                landlord: landlord,
                facilityInfo: facilityInfo,
            })
            return res.status(201).send({
                message: 'Housing added successfully'
            })
        })
    } catch (err) {
        return res.status(400).send({
            message: err
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const housing = await Housing.findOneAndUpdate({ _id: id },
        { $push: { tenants: req.body.employee_id } }
    );
    if (!housing) {
        return res.status(404).send({
            message: 'Housing not found'
        })
    }
    return res.status(201).send({
        message: 'Housing added to tenant successfully'
    })
})

module.exports = router;