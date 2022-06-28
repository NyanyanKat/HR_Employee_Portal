const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('/homeRoutes');

const RegisterRouter = require("./registerRouter");
router.use('/api', RegisterRouter);

module.exports = router;

