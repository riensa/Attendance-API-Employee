require('express-group-routes');
const express = require('express');
const router = express.Router();
const ProfileController = require("../controllers/profile.controller.js");
const ProfileValidator = require('../middlewares/validators/profile.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');

router.use(VerifyToken)
router.get("/info", ProfileValidator.validateEmployeeInfo, ProfileController.info);

module.exports = router;