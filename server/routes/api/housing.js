const router = require('express').Router();
const Housing = require('../../model/Housing');
router.get('/summary', async (req, res) => {
    const housing = await Housing.find({});
    return res.status(201).send(JSON.stringify(housing));
})

router.get('/:id', async (req, res) => {
    const housing = await Housing.findById(req.params.id).populate('User').populate('UserInfo');
    return res.status(201).send(JSON.stringify(housing));
})

module.exports = router;