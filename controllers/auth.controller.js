const jwt = require("jsonwebtoken");
const DB = require("../models");
const bcrypt = require("bcrypt");

const EmployeesDB = DB.employees;

exports.login = async (req, res) => {
	try {
		// find username
		let employee = await EmployeesDB.findOne({
			where: {
				email: req.body.email,
				status: 'active'
			}
		})

		// compare password
		let isValidPassword = false
		if(employee) {
			isValidPassword = bcrypt.compareSync(
				req.body.password,
				employee.password
			);
		} 

		// return error if invalid username or password
		if (!employee || !isValidPassword) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: 'Validation Error',
				errors: [{
					"value": req.body.email,
					"msg": "Invalid email or password",
					"param": "email",
					"location": "body"
				}]
			});
		}

		//signing token with user id
		var token = jwt.sign({
			id: employee.id,
			user_type: 'E'
		}, process.env.API_SECRET, {
			expiresIn: 86400
		});

		return res.send({
			status: 200,
			success: true,
			message: 'Login Successfull',
			data: {
				employee: {
					email: employee.email,
					fullname: employee.fullname
				},
				accessToken: token
			}
		})
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}