const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// const homeRoutes = require('./homeRoutes');
// router.use(homeRoutes);

// const loginRouter = require("./api/loginRouter");
// router.use(loginRouter);

// const RegisterRouter = require("./api/registerRouter");
// router.use(RegisterRouter);



module.exports = router;