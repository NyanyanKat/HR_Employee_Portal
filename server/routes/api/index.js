const router = require('express').Router();

const registerRoutes = require('./registerRouter');
const loginRoutes = require('./loginRouter');
const housingRoutes = require('./housing');
const onboardingRoutes = require('./onboarding');
const visaRoutes = require('./visa');
const employeeRoutes = require('./employee');

router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/housing', housingRoutes);
router.use('/onboarding', onboardingRoutes);
router.use('/visa', visaRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;