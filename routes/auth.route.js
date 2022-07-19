require('express-group-routes');
const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.controller.js");
const AuthValidator = require('../middlewares/validators/auth.validator.js');


// Retrieve all rooms from the database
router.post("/login", AuthValidator.validateLogin, AuthController.login);

module.exports = router;