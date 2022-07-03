const express = require("express");
const router = express.Router();
const UserInfo = require("../../model/UserInfo");

router.get("/", async (req, resp) => {
  let id = req.query.id;
  UserInfo.findOne({ userID: id }).then((data, err) => {
    if (!data) {
      console.log("err", err);
      resp.status(400).send(err);
    } else {
      resp.status(201).send(data);
      console.log("data", data);
      console.log("id", id);
    }
  });
});

module.exports = router;