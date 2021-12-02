const router = require('express').Router();
// Users
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);


module.exports = router;
