const router = require('express').Router();
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