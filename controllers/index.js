const router = require('express').Router();
const homeRoute = require('./homepage');
const loginRoute = require('./login');
const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');

router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoute);
router.use('/', homeRoute);
router.use('/api', apiRoutes);


module.exports = router;
