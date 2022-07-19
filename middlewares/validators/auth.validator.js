const {check, validationResult} = require('express-validator');

exports.validateLogin = [
    check('email')
			.trim()
			.escape()
			.not()
			.isEmpty()
			.withMessage('Email can not be empty!'),
    check('password')
			.trim()
			.escape()
			.not()
			.isEmpty()
			.withMessage('Password can not be empty!'),
    (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
			return res.status(400).json({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: errors.array()
			});
				next();
  },
];
