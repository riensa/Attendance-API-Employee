require('express-group-routes');
const express = require('express');
const router = express.Router();
const ProfileController = require("../controllers/profile.controller.js");
const ProfileValidator = require('../middlewares/validators/profile.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');

router.use(VerifyToken)
router.get("/", ProfileValidator.validateSessionAdmin, ProfileController.findAll);
router.get("/detail/:id", ProfileValidator.validateSession, ProfileController.findOne);
router.post("/", ProfileValidator.validateEmployee, ProfileController.create);
router.put("/", ProfileValidator.validateEmployeeUpdate, ProfileController.update);
router.put("/password", ProfileValidator.validateEmployeePassword, ProfileController.password);

module.exports = router;