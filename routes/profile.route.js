require('express-group-routes');
const express = require('express');
const router = express.Router();
const ProfileController = require("../controllers/profile.controller.js");
const ProfileValidator = require('../middlewares/validators/profile.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');


// Retrieve all rooms from the database
router.post("/", [VerifyToken, ProfileValidator.validateAdmin], ProfileController.create);

module.exports = router;