const router = require('express').Router();
const User = require('../../model/User');
const UserInfo = require('../../model/UserInfo');
const mongoose = require('mongoose');

//get all employees
router.get('/', async (req, res) => {
    const employees = await User.find({ role: 'employee' }).sort({ username: 1 });

    return res.status(201).send(JSON.stringify(employees));
})

//get hr employee
router.get('/hr', async (req, res) => {
    const hr = await User.find({ role: 'hr' });
    return res.status(201).send(JSON.stringify(hr));
})

router.get('/no-housing', async (req, res) => {
    const employees = await User.find({ role: 'employee', housingID: null })
    .sort({ username: 1 })
    .populate('infoID')
    .populate('housingID');
    return res.status(201).send(JSON.stringify(employees));
})

router.get('/info', async (req, res) => {
    const users = await UserInfo.find({}).populate('User');
    // console.log(users)
    return res.status(201).send(JSON.stringify(users));
})

//get single employee info
router.get('/info/:eid', (req, res) => {

    const eid = req.params.eid;
    console.log(eid)
    // const id = mongoose.Types.ObjectId(eid);

    // console.log(typeof id);
    UserInfo.findOne({ userID: eid }).populate('userID')
        .then(user => {
            console.log('user', user);
            res.send(user);
        }).catch(err => console.log(err));
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const employee = await User.findOneAndUpdate({ _id: id },
        {housingID: req.body.housing_id}
    );
    if (!employee) {
        return res.status(404).send({
            message: 'Employee not found'
        })
    }
    return res.status(201).send({
        message: 'Employee added to housing successfully'
    })

})

module.exports = router;