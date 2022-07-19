exports.create = async (req, res) => {
	try {
		return res.send({
			status: 200,
			success: true,
			message: "New Employee Created!",
			data: {
				username: req.body.username,
				fullname: req.body.fullname
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