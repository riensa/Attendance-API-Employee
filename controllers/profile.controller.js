const DB = require("../models");
const dayjs = require('dayjs')
const bcrypt = require("bcrypt");

const EmployeesDB = DB.employees;
const Op = DB.Sequelize.Op;

exports.findAll = async (req, res) => {
	try {

		// fetch all data
		let data =  await EmployeesDB.findAll()

		return res.send({
			status: 200,
			success: true,
			message: "Fetch All Employee Successfully",
			data: data
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

exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;

		let data = await EmployeesDB.findOne({ 
      where: { id: id }
    })

		if(data) {
			return res.send({
				status: 200,
				success: true,
				message: "Fetch Detail Employee Successfully",
				data: {
					id: data.id,
					fullname: data.fullname,
					dob: dayjs(data.dob).format('YYYY-MM-DD') ,
					email: data.email,
					status: data.status
				}
			})
		}

		return res.status(400).send({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: [{
				"value": id,
				"msg": "Employee not found",
				"param": "id",
				"location": "params"
			}]
		});
		
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.create = async (req, res) => {
	try {

		// check if email is unique
		let isUnique =  await EmployeesDB.findOne({
			where: {email: req.body.email}
		})

		if(isUnique) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.email,
					"msg": "Email already exist",
					"param": "email",
					"location": "body"
        }]
			});
		} 

		let now = dayjs().format('YYYY-MM-DD HH:mm:ss') 
		let stringDOB = dayjs(req.body.dob).format('DDMMMYYYY') 

		const NewEmployee = await EmployeesDB.create({
      fullname: req.body.fullname,
			dob: req.body.dob,
			email: req.body.email,
      password: bcrypt.hashSync(stringDOB, 8),
			password_reset_date: now,
			password_reset_by: req.user.id,
			created_by: req.user.id
    })

		return res.send({
			status: 200,
			success: true,
			message: "New Employee Created!",
			data: {
				fullname: NewEmployee.fullname,
				email: NewEmployee.email,
				password: stringDOB
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

exports.update = async (req, res) => {
	try {

		// check if email is unique
		let isUnique =  await EmployeesDB.findOne({
			where: {
				id: {
					[Op.ne]: req.body.id
				},
				email: req.body.email
			}
		})

		if(isUnique) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.email,
					"msg": "Email already exist",
					"param": "email",
					"location": "body"
        }]
			});
		} 

		let stringDOB = dayjs(req.body.dob).format('DDMMMYYYY') 

		let values = {
			fullname: req.body.fullname,
			dob: req.body.dob,
			email: req.body.email,
			status: req.body.status
		}

		if(req.body.reset_password == true || req.body.reset_password == 'true') {
			values.password = bcrypt.hashSync(stringDOB, 8),
			values.password_reset_date= dayjs().format('YYYY-MM-DD HH:mm:ss') 
			values.password_reset_by= req.user.id
		}

		console.log(values)

		let data = await EmployeesDB.update(values, {
      where: { id: req.body.id }
    })

		

		if(data == 1) {
			let response = {
				fullname: req.body.fullname,
				dob: req.body.dob,
				email: req.body.email,
				status: req.body.status
			}

			if(req.body.reset_password == true || req.body.reset_password == 'true') {
				response.password = stringDOB
			}

			return res.send({
				status: 200,
				success: true,
				message: "Updated Successfully!",
				data: response
			})
		} 

		return res.status(400).send({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: [{
				"value": req.body.id,
				"msg": "Employee not found",
				"param": "email",
				"location": "body"
			}]
		});

	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.password = async (req, res) => {
	try {

		// validate old password
		let data =  await EmployeesDB.findOne({
			where: {id: req.user.id}
		})

		// compare password
		let isValidPassword = false
		if(data) {
			isValidPassword = bcrypt.compareSync(
				req.body.old_password,
				data.password
			);
		} 

		if (!data || !isValidPassword) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: 'Validation Error',
				errors: [{
					"value": req.body.old_password,
					"msg": "Invalid Password",
					"param": "old_password",
					"location": "body"
				}]
			});
		}

		EmployeesDB.update({
			password: bcrypt.hashSync(req.body.new_password, 8)
		}, {
      where: { id: req.user.id }
    })

		return res.send({
			status: 200,
			success: true,
			message: "Update password Successfully",
			data: {}
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