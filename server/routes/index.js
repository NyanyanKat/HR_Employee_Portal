const router = require('express').Router();

const loginRouter = require("./login");
const RegisterRouter = require("./registerRouter");
router.use('/api', loginRouter);
router.use('/api', RegisterRouter);

module.exports = router;

