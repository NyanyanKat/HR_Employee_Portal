const router = require('express').Router();

const registerRoutes = require('./login_register_router/registerRouter');
const loginRoutes = require('./login_register_router/loginRouter');

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);

module.exports = router;
