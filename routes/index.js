// routes/index.js
const express = require('express');
require('express-group-routes');

// Import routes
const AuthRoute = require('./auth.route');
const ProfileRoute = require('./profile.route');

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/profile', ProfileRoute);

// 404
router.use("/", (req, res, next) => {
  res.status(404).json({
		status: 404,
		success: false,
		message: 'Not Found',
		errors: 'Not Found'
	})
})


module.exports = router;