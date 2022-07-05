const express = require("express");
const router = express.Router();
const formidable = require("formidable")
const path = require('path')
var fs = require('fs-extra');
const UserInfo = require('../../model/UserInfo')
const User = require('../../model/User')

function moveFile(filepath, foldername) {
  let original_path = filepath
  const directory = path.join(__dirname, '..', '..', 'public', 'uploads')
  let filename = original_path.split('upload')[1].split('s')[1]
  let destinationPath = directory + `/${foldername}` + filename
  fs.move(original_path, destinationPath, function (err) {
    if (err) return console.error(err)
    console.log(`move the ${filename} to ${foldername} success!`)
  })
  const saveFilePath = `/${foldername}/${filename}`
  return saveFilePath
}

router.post('/', async function (req, res) {
  try {
    const directory = path.join(__dirname, '..', '..', 'public', 'uploads')

    const form = new formidable.IncomingForm({
      uploadDir: directory,
      keepExtensions: true
    })

    form.parse(req, async (errs, fields, files) => {
      if (errs){
        throw new Error('Media Server Error')
      }

      // console.log('files:', files)
      // console.log('fields:', fields)

      //check if the files are received
      // console.log('licenseCopy',files['license.licenseCopy'].filepath)
      // console.log('optReceipt',files['citizenship.optReceipt'].filepath)
      // console.log('profilePic',files.profilePic.filepath)

      if(files.profilePic){
        var profilePicPath = moveFile(files.profilePic.filepath, 'profile_pics')
      }
      if(files['license.licenseCopy']){
        var licenseCopyPath = moveFile(files['license.licenseCopy'].filepath, 'license_copys')
      }
      if(files['citizenship.optReceipt']){
        var optReceiptPath = moveFile(files['citizenship.optReceipt'].filepath, 'opt_receipts')
      }
      // console.log(profilePic,licenseCopy,optReceipt)

      const license = {
        number: fields['license.number'],
        expiration: fields['license.expiration'],
        photo: licenseCopyPath
      }

      const citizenship = {
        citizen: fields['citizenship.citizen'],
        status: fields['citizenship.status'],
        optReceipt: fields['citizenship.optReceipt'],
        start: fields['citizenship.start'],
        end: fields['citizenship.end'],
        optReceipt: optReceiptPath
      }

      const reference = {
        last: fields['reference.last'],
        first: fields['reference.first'],
        middle: fields['reference.middle'],
        tel: fields['reference.tel'],
        email: fields['reference.email'],
        relationship: fields['reference.relationship']
      }

      const name = {
        first: fields['name.first'],
        last: fields['name.last'],
        middle: fields['name.middle'],
        preferred: fields['name.perferred']
      }

      const car = {
        make: fields['car.carmake'],
        model: fields['car.carmodel'],
        color: fields['car.carcolor']
      }

      const address = {
        houseNumber: fields['address.houseNumber'],
        streetName: fields['address.streetName'],
        city: fields['address.city'],
        state: fields['address.state'],
        zip: fields['address.zip']
      }

      let contactInfo = []
      for(i=0; i<2; i++){
        contactInfo.push({
          first:fields[`eContact.${i}.first`],
          last:fields[`eContact.${i}.last`],
          middle:fields[`eContact.${i}.middle`],
          tel:fields[`eContact.${i}.tel`],
          email:fields[`eContact.${i}.email`],
          relationship:fields[`eContact.${i}.relationship`]
        })
      }
      //console.log('contactInfo:',contactInfo)


      await UserInfo.create({
        userID: fields.userID,
        address,
        car,
        cellphone: fields.cellphone,
        dob: fields.dob,
        eContact: contactInfo,
        gender: fields.gender,
        name,
        reference,
        ssn: fields.ssn,
        workphone: fields.workphone,
        profile: profilePicPath,
        citizenship,
        license
      })
      await User.updateOne({_id:fields.userID},{onboardingStatus:"pending"})
      const userinfoID = await UserInfo.findOne({userID: fields.userID}).populate('userID')
      await User.updateOne({_id:fields.userID},{infoID: userinfoID})
      res.status(200).send('Sucessfully inserting the user info to Mongodb.')
    })
  } catch (e) {
    // console.log('error: ' + e.message)
    res.status(400).send(e.message);
  }
});

module.exports = router;