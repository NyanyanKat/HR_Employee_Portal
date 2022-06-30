const router = require('express').Router();
const Housing = require("../../model/Housing");
const User = require("../../model/User");
const Report = require("../../model/Report");
const Comment = require("../../model/Comment");

router.get("/get-detail", async function (req, resp) {
  try {
    const userID = '';
    let user = await User.findOne({ _id: userID });
    let housing = await Housing.findOne({ _id: user.housingID});
    let respObj = {
      address: housing.address,
      tenents: housing.tenants
    }
    resp.status(201).send(JSON.stringify(respObj));
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.post("/add-report", async function (req, resp) {
  try {
    const userID = '';
    let user = await User.findOne({ _id: userID });
    let report = req.body;
    report.createdBy = userID;
    report.housingId = user.housingID;

    await Report.create(report);
    resp.status(201).send('Report added');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.get("/get-reports", async function (req, resp) {
  try {
    const userID = '';
    let user = await User.findOne({ _id: userID });
    let reports = await Report.find({ housingID: user.housingID});

    resp.status(201).send(JSON.stringify(reports));
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.post("/add-comment/:reportID", async function (req, resp) {
  try {
    const userID = '';
    let comment = req.body;
    comment.reportID = req.params.reportID;
    comment.creatorID = userID;

    await Comment.create(comment);
    resp.status(201).send('Comment added');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.post("/update-comment/:commentID", async function (req, resp) {
  try {
    let comment = await Comment.findOne({ _id: req.params.commentID });
    comment.desc = req.body.desc;
    await Comment.updateOne({_id : req.params.commentID}, {$set: comment});
    resp.status(201).send('Comment updated');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.get("/get-comment/:reportID", async function (req, resp) {
  try {
    let comments = await Comment.find({ reportID: req.params.reportID });
    resp.status(201).send(JSON.stringify(comments));
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

module.exports = router;