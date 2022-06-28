const router = require('express').Router();

const registerRoutes = require('./login_register_router/registerRouter');
const loginRoutes = require('./login_register_router/loginRouter');

<<<<<<< Updated upstream
router.use(registerRoutes);
router.use(loginRoutes);
=======
router.use('/api', apiRoutes);
// router.use('/', homeRoutes);
>>>>>>> Stashed changes

module.exports = router;