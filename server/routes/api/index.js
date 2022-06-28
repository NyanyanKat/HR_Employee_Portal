const router = require('express').Router();

const registerRoutes = require('./registerRouter');
const userRoutes = require('./userRouter');

router.use('/register', registerRoutes);
router.use('/user', loginRoutes);

module.exports = router;