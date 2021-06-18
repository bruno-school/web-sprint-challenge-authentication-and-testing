const jwt = require('jsonwebtoken')

const restrict = (req, res, next) => {
	const token = req.headers.authorization
	if (!token) {
		next({status: 403, message: 'Token required'})
	}

	jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
		if (err) {
			next({status: 401, message: 'Token invalid'})
		} else {
			req.decodedToken = decodedToken
			next()
		}
	})
}

module.exports = restrict
