// routes/index.js
const express = require('express');
require('express-group-routes');

// Import routes
const AuthRoute = require('./auth.route');
const ProfileRoute = require('./profile.route');

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/profile', ProfileRoute);


module.exports = router;