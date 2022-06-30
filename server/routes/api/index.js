const router = require('express').Router();

const registerRoutes = require('./register');
const loginRoutes = require('./login');
const hrOnboardingRoutes = require('./onboarding_hr')
const empOnboardingRoutes = require('./onboarding_emp');
const employeeRoutes = require('./employee');
const housingRoutes = require('./housing');
const visaRoutes = require('./visa');


router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/housing', housingRoutes);
router.use('/visa', visaRoutes);
router.use('/employee', employeeRoutes);
router.use('/hire/onboarding', hrOnboardingRoutes);
router.use('/onboarding', empOnboardingRoutes);



module.exports = router;