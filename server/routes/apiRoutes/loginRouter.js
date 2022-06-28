const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../db_conn/db_conn");
const userCollection = db.collection("users");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

//Winston  - Login
router.post("/login", async function (req, resp) {
  let user = req.body;
  let errMsg = {};
  user.username = user.username.toLowerCase();

  userCollection
    .findOne({ username: user.username })
    .then(function (foundUser) {
      if (foundUser != undefined) {
        bcrypt.compare(user.password, foundUser.password, function (err, res) {
          if (res) {
            const user = {
              id: foundUser._id,
              email: foundUser.email,
              username: foundUser.username,
              role:foundUser.role
            }
            // resp.set({
            //   "Content-Type": "application/json",
            //   "Authorization": jwt.sign({ id: _id, email, username }, JWT_KEY),
            // });
            return resp.status(201).send({
              user: user,
              token: jwt.sign(user, JWT_KEY)
            })
          } else {
            // password not match
            errMsg.password = "wrong password";
          }
          resp.status(400).send(JSON.stringify(errMsg));
        });
      } else {
        // not found user
        errMsg.username = "invalid username.";
      }
      if (Object.keys(errMsg).length != 0)
        throw new Error(JSON.stringify(errMsg));
    })
    .catch((e) => {
      resp.status(400).send(e.message);
    });
});

module.exports = router;
