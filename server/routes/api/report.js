const router = require('express').Router();
const Housing = require('../../model/Housing');
const Report = require('../../model/Report');

//get report based on report id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id; // report id
        const reports = await Report.findById(id).populate('comments');
        return res.status(201).send(JSON.stringify(reports));
    } catch(err){
        return res.status(500).send(err);
    }
})

//get report based on housing id
router.get('/housing/:id', async (req, res) => {
    try{
        const id = req.params.id; // housing id
        const reports = await Report.find({ housingID: id }).populate('comments');
        return res.status(201).send(JSON.stringify(reports));
    } catch(err){
        return res.status(500).send(err);
    }
})


module.exports = router;