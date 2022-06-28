const express = require('express');
const router = express.Router();
const db = require("../../db_conn/db_conn");
const UserInfo = require ("../../model/UserInfo");
const userInfoCollection = db.collection("userInfos");

router.post('/onboarding-application', async function (req, resp) {
  let info = req.body;
  try {
    await UserInfo.create(req.body);
    resp.status(201).send('Your application is sent to HR.');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }

});

module.exports = router;