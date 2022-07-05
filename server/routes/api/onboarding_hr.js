const router = require('express').Router();
const UserInfo = require('../../model/UserInfo')
const User = require('../../model/User')

// list all the employees' onboarding application
router.get('/', async(req,resp)=>{
    try{
        // return array
        const nothing = await User.find({onboardingStatus:"never submitted", role:"employee"}).populate('infoID')
        const pending = await User.find({onboardingStatus:"pending", role:"employee"}).populate('infoID')
        const rejected = await User.find({onboardingStatus:"rejected", role:"employee"}).populate('infoID')
        const approved = await User.find({onboardingStatus:"approved", role:"employee"}).populate('infoID')
        const allApps = {
            pendingReview:pending,
            rejectedReview:rejected,
            approvedReview:approved,
            nosubmissionReview:nothing
        }
        console.log(allApps)
        resp.status(200).send(allApps)
    }catch(e){
        console.log(e)
        resp.status(500).send(e)
    }
})

// view the onboarding application of a particular employee
router.get('/:eid', async(req,resp)=>{
    try {
        const eid = req.params.eid
        const userInfo = await UserInfo.findOne({userID:eid}).populate('userID')
        console.log(userInfo)
        resp.status(200).send(userInfo)
    } catch (e) {
        console.log(e)
        resp.status(500).send(e.message)
    }

})

//change the status of employee onboarding process
router.post('/', async(req,resp)=>{
    try {
        if(req.body.feedback){
            console.log(req.body.feedback)
            await User.updateOne({_id:req.body.eid},{onboardingStatus:req.body.status})
            await UserInfo.updateOne({userID:req.body.eid},{rejFeedback: req.body.feedback})
        }else{
            await User.updateOne({_id:req.body.eid},{onboardingStatus:req.body.status})
            await Visa.create({
                userID:req.body.eid,
                status: 1
            })
        }
        resp.status(200).send('update onboarding status successfully!')
    } catch (e) {
        console.log(e)
        resp.status(500).send(e.message)
    }
})


module.exports = router;