const router = require('express').Router();

const housingRoutes = require('./housingRouter');
const onboardingRoutes = require('./onboardingApplicationRouter');

router.use('/housing', housingRoutes);
router.use('/onboarding', onboardingRoutes);

module.exports = router;