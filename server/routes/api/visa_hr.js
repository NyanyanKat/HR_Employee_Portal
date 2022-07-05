const router = require('express').Router();
const Visa = require('../../model/Visa')

router.get('/all',async(req,res)=>{
    try {
        const allVisaEmps = await Visa.find({}).populate("userInfoID")
        const incompVisaEmps = await Visa.find({'I20.status':{$ne: "approved"}}).populate("userInfoID")
        const hrVisa = {
            all:allVisaEmps,
            incomp:incompVisaEmps
        }
        // console.log(hrVisa)
        res.status(200).send(hrVisa)
    } catch (err) {
        // console.log(error)   
        res.status(500).send(err)
    }
})

router.post('/one',async(req,res)=>{
    try {
        // console.log(req.body.userInfoID)
        // console.log(req.body.visaID)
        const empVisaInfo = await Visa.findOne({_id:req.body.visaID, userInfoID:req.body.userInfoID}).populate("userInfoID")
        // console.log(empVisaInfo)
        res.status(200).send(empVisaInfo)
    } catch (error) {
        // console.log(err)
        res.status(500).send(err)
    }
})

router.post('/status', async(req,res)=>{
    try {
        const {visaInfoID,eid, phaseNum} = req.body
        if(req.body.feedback){
            switch(phaseNum){
                case 1:
                    await Visa.updateOne({_id: visaInfoID}, {'EAD.status':"rejected", 'EAD.rejFeedback':req.body.feedback})
                    break;
                case 2:
                    await Visa.updateOne({_id: visaInfoID}, {'I983.status':"rejected",'I983.rejFeedback':req.body.feedback})
                    break;
                case 3:
                    await Visa.updateOne({_id: visaInfoID}, {'I20.status':"rejected", 'I20.rejFeedback':req.body.feedback})
                    break;
                default:
                    break;
            }
        }else{
            switch(phaseNum){
                case 1:
                    await Visa.updateOne({_id: visaInfoID}, {status: phaseNum+1, 'EAD.status':"approved"})
                    break;
                case 2:
                    await Visa.updateOne({_id: visaInfoID}, {status: phaseNum+1, 'I983.status':"approved"})
                    break;
                case 3:
                    await Visa.updateOne({_id: visaInfoID}, {'I20.status':"approved"})
                    break;
                default:
                    break;
            }
        }
        res.status(200).send('Update Visa Status Successfully!')
        
    } catch (err) {
        // console.log(err)
        res.status(500).send(err)        
    }
})

module.exports = router;