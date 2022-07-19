const jwt = require("jsonwebtoken");
const DB = require("../../models");
const AdminsDB = DB.admins;

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      
			if (err || !decode) {
				req.user = undefined;
				if(err) {
					return res.status(500)
						.send({
							status: 500,
							success: false,
							message: "Unexpected Error",
							errors: err || "Some error occurred"
						});
				}
				next()
			} else {

				AdminsDB.findOne({ where: {id: decode.id} })
					.then(data => {
						req.user = data;
						next()
					})
					.catch(err => {
						return res.status(500)
						.send({
							status: 500,
							success: false,
							message: "Unexpected Error",
							errors: err || "Some error occurred"
            });
					});
			}
    });
  } else {
		req.user = undefined;
		next()
	}
};
module.exports = verifyToken;