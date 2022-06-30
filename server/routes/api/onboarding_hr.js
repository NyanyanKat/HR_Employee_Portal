const router = require('express').Router();
const UserInfo = require('../../model/UserInfo')


// list all the employees' onboarding application
router.get('/', async(req,resp)=>{
    try{
        // return array
        const pending = await UserInfo.find({status:"pending"}).populate('userID')
        const rejected = await UserInfo.find({status:"rejected"}).populate('userID')
        const approved = await UserInfo.find({status:"approved"}).populate('userID')
        const allApps = {
            pendingReview:pending,
            rejectedReview:rejected,
            approvedReview:approved
        }
        // console.log(allApps)
        resp.status(200).send(allApps)
    }catch(e){
        console.log(e)
        resp.status(500).send(e)
    }
})

// view the onboarding application of a particular employee
router.get('/:eid', async(req,resp)=>{

})

module.exports = router;