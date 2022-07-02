const router = require('express').Router();
const User = require('../../model/User');
const UserInfo = require('../../model/UserInfo');
const mongoose = require('mongoose');

//get all employees
router.get('/', async (req, res) => {
    const employees = await User.find({ role: 'employee' }).sort({username: 1});

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
            console.log('user',user);
            res.send(user);
        }).catch(err => console.log(err));
})
// const User = require('../../model/User');
// //get all employees
// router.get('/', (req, res) => {
//     const employees = User.find({ role: 'employee' })
//         .then(employees => res.json(employees))
//         .catch(err => res.status(404).json({ notfound: 'No employees found' }));
//     return res.status(201).send({
//         employees: employees
//     })
// })

// //get single employee
// router.get('/:id', (req, res) => {
//     User.findById(req.params.id)

//         .then(employee => res.json(employee))
//         .catch(err => res.status(404).json({ notfound: 'No employee found' }));
//     return res.status(201).send({
//         employee: employee
//     })
// })

module.exports = router;