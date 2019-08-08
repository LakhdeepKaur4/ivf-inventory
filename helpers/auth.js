const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const {jwtSecret } = require("../config/vars");

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
	if (!token) {
		return res.status(httpStatus.FORBIDDEN).json({
			auth: false,
			message: 'No token provided.'
		});
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}
		req.userId = decoded.id;
		next();
	});
}

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;