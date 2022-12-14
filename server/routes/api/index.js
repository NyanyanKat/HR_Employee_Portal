const router = require('express').Router();

const registerRoutes = require('./register');
const loginRoutes = require('./login');
const hrOnboardingRoutes = require('./onboarding_hr')
const empOnboardingRoutes = require('./onboarding_emp');
const employeeRoutes = require('./employee');
const empHousingRoutes = require('./housing_emp');
const profileRoutes = require('./profile')
const empVisaRoutes = require('./visa_emp')
const hrVisaRoutes = require('./visa_hr')

const hrHousingRoutes = require('./housing');
const hrReportsRoutes = require('./report');

router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/housing', empHousingRoutes);
router.use('/hr/housing', hrHousingRoutes);
router.use('/visa', empVisaRoutes);
router.use('/employee', employeeRoutes);
router.use('/hire/onboarding', hrOnboardingRoutes);
router.use('/onboarding', empOnboardingRoutes);
router.use('/hr/report', hrReportsRoutes);
router.use('/user', profileRoutes);
router.use('/hr/visa', hrVisaRoutes);



module.exports = router;
