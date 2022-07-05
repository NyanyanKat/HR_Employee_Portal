const router = require('express').Router();
const formidable = require("formidable")
const Housing = require('../../model/Housing');
const User = require('../../model/User');
const Report = require('../../model/Report');
const Comment = require('../../model/Comment');
const mongoose = require('mongoose');
const { collection } = require('../../model/Report');

router.get('/summary', async (req, res) => {
    const housing = await Housing.find({}).populate('tenants');
    return res.status(201).send(JSON.stringify(housing));
})

router.get('/report/:id', async (req, res) => {
    const id = req.params.id; // report id
    const report = Report.findOne({ _id: id });
    return res.status(201).send(JSON.stringify(report));
})

//Create comment

router.post('/report/:id/comment', async (req, res) => {
    const id = req.params.id; // report id
    const desc = req.body.desc;
    const creatorID = req.body.creatorID;
    const reportID = req.body.reportID;
    console.log('data', desc, creatorID, reportID);
    const newComment = Comment.create({
        desc,
        creatorID,
        reportID});
    const report = await Report.findOneAndUpdate({ _id: id }, {
        $push: { comments: newComment._id }
    }, { new: true });
    console.log('new comment',newComment);
    return res.status(201).send(JSON.stringify(newComment));
})


router.get('/one/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    const housing = await Housing.findOne({ _id: id });
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
        { $addToSet: { tenants: req.body.employee_id } }
    ).populate('tenants');
    if (!housing) {
        return res.status(404).send({
            message: 'Housing not found'
        })
    }
    return res.status(201).send({
        message: 'Housing added to tenant successfully'
    })
})

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id; //housing id

    const employees = User.find({ housingID: id }, (err, users) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        }
        for (let i = 0; i < users.length; i++) {
            User.findOneAndUpdate({ _id: users[i]._id },
                { housingID: '' }
            )
        }
    });


    const housing = await Housing.findOneAndDelete({ _id: id });
    if (!housing) {
        return res.status(404).send({
            message: 'Housing not found'
        })
    }

    return res.status(201).send({
        housing,
        message: 'Housing deleted successfully'
    })
})

module.exports = router;