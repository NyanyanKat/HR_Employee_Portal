const router = require('express').Router();
const Housing = require('../../model/Housing');
const Report = require('../../model/Report');
const Comment = require('../../model/Comment');

//get report based on report id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; // report id
        const reports = await Report.findById(id).populate('comments');
        return res.status(201).send(JSON.stringify(reports));
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get report based on housing id
router.get('/housing/:id', async (req, res) => {
    try {
        const id = req.params.id; // housing id
        const reports = await Report.find({ housingID: id }).populate('comments');
        return res.status(201).send(JSON.stringify(reports));
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get comments based on report id
router.get('/comment/:id', async (req, res) => {
    try {
        const id = req.params.id; // report id
        const comments = await Comment.find({ reportID: id })
            .populate({
                path: 'reportID',
                populate: {
                    path: 'creatorID'
                }
            });

        // {
        //     path: 'reportID',
        //     populate: {
        //         path: 'creatorID',
        //         model: 'User'
        //     }
        // }
        return res.status(201).send(JSON.stringify(comments));
    }
    catch (err) {
        return res.status(500).send(err);
    }
})

//get one comment
router.post('/comment/one/:id', async (req, res) => {
    try {

        const id = req.params.id; // comment id
        const comment = await Comment.findOneAndUpdate({ _id: id },
            { desc: req.body.comment},
            { new: true });
        return res.status(201).send(JSON.stringify(comment));
    } catch (err) {
        console.log('reqbody',req.body)
        return res.status(500).send(err);
    }

})

module.exports = router;