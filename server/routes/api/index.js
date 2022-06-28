const router = require('express').Router();

const registerRoutes = require('./registerRouter');
const loginRoutes = require('./login');

router.use('/register', registerRoutes);
router.use('/login', loginRoutes);

module.exports = router;