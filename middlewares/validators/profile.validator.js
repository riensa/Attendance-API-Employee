const {check, validationResult} = require('express-validator');

exports.validateSession = [
	(req, res, next) => {	

		// check auth
		if(!req.user) {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}
		next();
	},
];

exports.validateSessionAdmin = [
	(req, res, next) => {
		// check auth
		if(!req.user || req.user.group !== 'A') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}
		next();
	},
];

exports.validateSessionEmployee = [
    (req, res, next) => {
			// check auth
			if(!req.user || req.user.group !== 'E') {
				return res.status(403).json({
					status: 403,
					success: false,
					message: 'Unauthorised Access',
					errors: 'Unauthorised Access'
				});
			}
			next();
  },
];

exports.validateEmployee = [
	check('fullname')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Fullname can not be empty!')
		.bail()
		.isLength({min:3})
		.withMessage('Fullname must be minimum 3 characters long'),
	check('dob')
		.trim()
		.not()
		.isEmpty()
		.withMessage('DOB can not be empty!')
		.bail()
		.isDate()
		.withMessage('DOB must be date'),
	check('email')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Email can not be empty!')
		.bail()
		.isEmail()
		.withMessage('Invalid email format!'),
	(req, res, next) => {

		// check auth
		if(!req.user || req.user.group !== 'A') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

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

exports.validateEmployeeUpdate = [
	check('id')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('ID can not be empty!')
		.bail()
		.isNumeric()
		.withMessage('ID must be Numeric'),
	check('fullname')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Fullname can not be empty!')
		.bail()
		.isLength({min:3})
		.withMessage('Fullname must be minimum 3 characters long'),
	check('dob')
		.trim()
		.not()
		.isEmpty()
		.withMessage('DOB can not be empty!')
		.bail()
		.isDate()
		.withMessage('DOB must be date'),
	check('email')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Email can not be empty!')
		.bail()
		.isEmail()
		.withMessage('Invalid email format!'),
	check('status')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Status can not be empty!')
		.bail()
		.isIn(['active', 'inactive'])
		.withMessage('Invalid status'),
	check('reset_password')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Reset Password can not be empty!')
		.bail()
		.isBoolean()
		.withMessage('Reset Password must be boolean'),
	(req, res, next) => {

		// check auth
		if(!req.user || req.user.group !== 'A') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

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

exports.validateEmployeePassword = [
	check('old_password')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Old Password can not be empty!'),
	check('new_password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('New Password can not be empty!')
		.bail()
		.isLength({min:8})
		.withMessage('New Password must be minimum 8 characters long'),
	check('confirm_password')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Confirm Password can not be empty!')
		.bail()
		.isLength({min:8})
		.withMessage('New Password must be minimum 8 characters long')
		.exists()
		.custom((value, { req }) => value === req.body.new_password)
		.withMessage('New Password must have the same value as Confirm Password'),
	(req, res, next) => {

		// check auth
		if(!req.user || req.user.group !== 'E') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

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

