const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../db_conn/db_conn");
const userCollection = db.collection("users");
const jwt = require('jsonwebtoken');
const {JWT_KEY} = process.env;

router.post('/onboarding-application', async function (req, resp) {
  let info = req.body;
  user.username = user.username.toLowerCase();
  // userCollection.findOne({username : user.username})
  // .then(function (foundUser) {
  //   if (foundUser != undefined) {
  //     bcrypt.compare(user.password, foundUser.password, function (err, res) {
  //       if (res) {
  //         resp.set('jwt', jwt.sign(user, JWT_KEY));
  //         resp.status(201).send('Login Successful!');
  //       }
  //       else {
  //         resp.status(200).send('Wrong Password');
  //       }
  //     });
  //   }
  //   else {
  //     resp.status(200).send('No User Information Found');
  //   }
  // })
  // .catch((e) => {
  //   resp.status(400).send(e);
  // });
});

module.exports = router;