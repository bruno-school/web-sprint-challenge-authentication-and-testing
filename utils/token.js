const jwt = require('jsonwebtoken')

const buildToken = (user) => {
	const payload = {
		subject: user.user_id,
		role_name: user.role_name,
		username: user.username,
	}

	const options = {
		expiresIn: '1d',
	}

	return jwt.sign(payload, process.env.SECRET, options)
}

module.exports = buildToken
