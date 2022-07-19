exports.login = async (req, res) => {
	try {
		return res.send({
			status: 200,
			success: true,
			message: 'Login Successfull',
			data: {
				admin: {
					username: req.body.username,
					fullname: req.body.fullname
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