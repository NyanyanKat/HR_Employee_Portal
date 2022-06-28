const router = require('express').Router();

const registerRoutes = require('./login_register_router/registerRouter');
const loginRoutes = require('./login_register_router/loginRouter');

router.use(registerRoutes);
router.use(loginRoutes);

module.exports = router;