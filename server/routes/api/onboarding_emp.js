const express = require("express");
const router = express.Router();
const formidable = require("formidable")
const path = require('path')
var fs = require('fs-extra');
const UserInfo = require('../../model/UserInfo')

function moveFile(filepath, foldername) {
  let original_path = filepath
  const directory = path.join(__dirname, '..', '..', 'public', 'uploads')
  let filename = original_path.split('upload')[1]
  let destinationPath = directory + `/${foldername}` + filename
  fs.move(original_path, destinationPath, function (err) {
    if (err) return console.error(err)
    console.log(`move the ${filename} to ${foldername} success!`)
  })
  let saveFilePath = `/${foldername} + filename`
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
      if (errs)
        throw new Error('Media Server Error')

      //check if the files are received
      // console.log('licenseCopy',files['license.licenseCopy'].filepath)
      // console.log('optReceipt',files['citizenship.optReceipt'].filepath)
      // console.log('profilePic',files.profilePic.filepath)

      const profilePicPath = moveFile(files.profilePic.filepath, 'profile_pic')
      const licenseCopyPath = moveFile(files['license.licenseCopy'].filepath, 'license_copy')
      const optReceiptPath = moveFile(files['citizenship.optReceipt'].filepath, 'opt_receipt')
      // console.log(profilePic,licenseCopy,optReceipt)

      const license = {
        number: fields['license.number'],
        expiration: fields['license.expiration'],
        licenseCopy: licenseCopyPath
      }

      const citizenship = {
        citizen: fields['citizenship.citizen'],
        status: fields['citizenship.status'],
        optReceipt: fields['citizenship.optReceipt'],
        start: fields['citizenship.citizenshipstart'],
        end: fields['citizenship.citizenshipend'],
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

      await UserInfo.create({
        userID: fields.userID,
        address,
        car,
        cellphone: fields.cellphone,
        dob: fields.dob,
        eContact: fields.eContact,
        gender: fields.gender,
        name,
        reference,
        ssn: fields.ssn,
        workphone: fields.workphone,
        profilePic: profilePicPath,
        citizenship,
        license
      }
      )
      res.status(200).send('Sucessfully inserting the user info to Mongodb.')
    })
  } catch (e) {
    console.log('error: ' + e.message)
    resp.status(400).send(e.message);
  }
});

module.exports = router;