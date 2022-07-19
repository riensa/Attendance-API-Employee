const {check, validationResult} = require('express-validator');

exports.validateEmployeeInfo = [
    (req, res, next) => {
			console.log(req.user.dataValues.user_type)
			// check auth
			if(!req.user || req.user.dataValues.user_type !== 'E') {
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
