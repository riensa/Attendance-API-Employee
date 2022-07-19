const {check, validationResult} = require('express-validator');

exports.validateAdmin = [
    check('username')
			.trim()
			.escape()
			.not()
			.isEmpty()
			.withMessage('Username can not be empty!')
			.isLength({min:4})
			.withMessage('Username must be minimum 4 characters long')
			.isAlphanumeric()
			.withMessage('Username must be alphanumeric'),
    check('password')
			.trim()
			.escape()
			.not()
			.isEmpty()
			.withMessage('Password can not be empty!')
			.isLength({min:8})
			.withMessage('Password must be minimum 8 characters long'),
		check('fullname')
			.trim()
			.escape()
			.not()
			.isEmpty()
			.withMessage('Fullname can not be empty!')
			.isLength({min:3})
			.withMessage('Fullname must be minimum 3 characters long'),
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
