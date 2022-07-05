const router = require('express').Router();
const Housing = require("../../model/Housing");
const User = require("../../model/User");
const Report = require("../../model/Report");
const Comment = require("../../model/Comment");

router.get("/get-detail", async function (req, resp) {
  try {
    const userID = req.query.userID;
    let user = await User.findOne({ _id: userID });
    if (user == undefined) 
      resp.status(400).send('no user found');
    
    let housing = await Housing.findOne({ _id: user.housingID});
    if (housing == undefined) 
      resp.status(400).send('no housing found');
    
    let respObj = {
      address: housing.address,
      tenents: housing.tenants
    }
    resp.status(201).send(JSON.stringify(respObj));
  }
  catch (e) {
    // console.log(e);
    resp.status(400).send(e.message);
  }
});

router.post("/add-report", async function (req, resp) {
  try {
    const userID = req.query.userID;
    let user = await User.findOne({ _id: userID });
    if (user == undefined) 
      resp.status(400).send('no user found');
    
    let report = req.body;
    report.creatorID = userID;
    report.housingID = user.housingID;
    if (report.title == undefined)
      resp.status(400).send('missing title');
    else if (report.desc == undefined)
      resp.status(400).send('missing description');
    await Report.create(report);
    resp.status(201).send('Report added');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.get("/get-reports", async function (req, resp) {
  try {
    const userID = req.query.userID;
    // let user = await User.findOne({ _id: userID });
    // let reports = await Report.find({ housingID: user.housingID});
    let reports = await Report.find({ creatorID: userID});
    let user = await User.findOne({_id: userID});
    if (user == undefined) 
      resp.status(400).send('no user found');
    let return_reports = [];
    reports.map((report, index) => {
      let return_report = {
        username: user.username,
        title: report.title,
        desc: report.desc,
        timestamp: report.timestamp,
        status: report.status,
        _id: report._id
      }
      return_reports.push(return_report)
    })
    resp.status(201).send(JSON.stringify(return_reports));
  }
  catch (e) {
    // console.log(e);
    resp.status(400).send(e.message);
  }
});

router.post("/add-comment", async function (req, resp) {
  try {
    const userID = req.query.userID;
    let comment = req.body;
    comment.creatorID = userID;
    // console.log(comment)
    let user = await User.findOne({_id: userID});
    if (user == undefined) 
      resp.status(400).send('no user found');
    if (comment.desc == undefined)
      resp.status(400).send('missing description');
    await Comment.create(comment);
    resp.status(201).send('Comment added');
  }
  catch (e) {
    // console.log(e);
    resp.status(400).send(e.message);
  }
});

router.post("/update-comment/:commentID", async function (req, resp) {
  try {
    let comment = await Comment.findOne({ _id: req.params.commentID });
    if (comment == undefined) 
      resp.status(400).send('comment was not uploaded');
    if (req.body.desc == undefined)
      resp.status(400).send('missing description');
    comment.desc = req.body.desc;
    await Comment.updateOne({_id : req.params.commentID}, {$set: comment});
    resp.status(201).send('Comment updated');
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

router.get("/get-comments/:reportID", async function (req, resp) {
  try {
    let comments = await Comment.find({ reportID: req.params.reportID });
    const userID = req.query.userID;
    let user = await User.findOne({_id: userID});
    if (user == undefined) 
      resp.status(400).send('no user found');
    let return_comments = [];
    for (let i in comments) {
      let comment = comments[i];
      let user = await User.findOne({_id: comment.creatorID});
      let return_comment = {
        username: user.username,
        self: (comments[i].creatorID == userID),
        desc: comment.desc,
        timestamp: comment.timestamp,
        _id: comment._id
      }
      return_comments.push(return_comment);
    }
    resp.status(201).send(JSON.stringify(return_comments));
  }
  catch (e) {
    resp.status(400).send(e.message);
  }
});

module.exports = router;