const router = require('express').Router();

const registerRoutes = require('./registerRouter');
const loginRoutes = require('./loginRouter');
// const housingRoutes = require('./housing');
// const onboardingRoutes = require('./onboarding');
// const visaRoutes = require('./visa');

router.use(registerRoutes);
router.use(loginRoutes);
// router.use('/housing', housingRoutes);
// router.use('/onboarding', onboardingRoutes);
// router.use('/visa', visaRoutes);

module.exports = router;