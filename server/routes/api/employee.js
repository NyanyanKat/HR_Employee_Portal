const router = require('express').Router();
const User = require('../../model/User');
const UserInfo = require('../../model/UserInfo');
//get all employees
router.get('/', async (req, res) => {
    const employees = await User.find({ role: 'employee' });

    return res.status(201).send(JSON.stringify(employees));
})

router.get('/info', async (req, res) => {
    const users = await UserInfo.find({}).populate('User');
    // console.log(users)
    return res.status(201).send(JSON.stringify(users));
})

//get single employee info
router.get('/info/:id', (req, res) => {

    const id = req.params.id;
    User.find({ email: id }).populate('UserInfo')
        .then(user => {
            console.log('user',user);
            res.send(JSON.stringify(user));
        }).catch(err => console.log(err));

    // const user = User.find({email: req.params.id}).populate('UserInfo');    
    // console.log('user',user)
    // const oneUser = user.infoID;
    // console.log('oneUser',oneUser)
    // return res.status(201).send(JSON.stringify(oneUser));



    // User.findById(req.params.id)

    //     .then(employee => res.json(employee))
    //     .catch(err => res.status(404).json({ notfound: 'No employee found' }));
    // return res.status(201).send({
    //     employee: employee
    // })
})

module.exports = router;