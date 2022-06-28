const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

const homeRoutes = require('/homeRoutes');
router.use('/',homeRoutes);

const loginRouter = require("./login");
router.use('/api', loginRouter);

const RegisterRouter = require("./registerRouter");
router.use('/api', RegisterRouter);

module.exports = router;

