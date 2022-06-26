const router = require('express').Router();

const RegisterRouter = require("./registerRouter");

router.use(RegisterRouter);

module.exports = router;

