const router = require('express').Router();

const apiRoutes = require('./apiRoutes')

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);

module.exports = router;
