const router = require('express').Router();

const RegisterRouter = require("./registerRouter");

router.use('/api', RegisterRouter);

module.exports = router;

