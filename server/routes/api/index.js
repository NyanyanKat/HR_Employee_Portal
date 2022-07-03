const router = require('express').Router();

const registerRoutes = require('./register');
const loginRoutes = require('./login');
const hrOnboardingRoutes = require('./onboarding_hr')
const empOnboardingRoutes = require('./onboarding_emp');
const employeeRoutes = require('./employee');
const empHousingRoutes = require('./housing_emp');
const visaRoutes = require('./visa');
const profileRoutes = require('./profile')


router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/housing', empHousingRoutes);
router.use('/visa', visaRoutes);
router.use('/employee', employeeRoutes);
router.use('/hire/onboarding', hrOnboardingRoutes);
router.use('/onboarding', empOnboardingRoutes);
router.use('/user', profileRoutes);




module.exports = router;