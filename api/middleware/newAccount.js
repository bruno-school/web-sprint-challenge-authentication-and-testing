const db = require('../../data/dbConfig')
const {hash} = require('../../utils/hash')
const bcrypt = require('bcrypt')
const newAccount = async (req, res, next) => {
	const {username, password} = req.body

	if (!username || !password) {
		next({status: 400, message: 'username and password required'})
	}

	try {
		const userExist = await db('users')
			.where('username', req.body.username.trim())
			.first()

		if (userExist) {
			next({status: 400, message: 'username taken'})
		} else {
			const salt = await bcrypt.genSalt(8)
			const hashPassword = await bcrypt.hash(password, salt)
			const newUser = {
				username: username.trim(),
				password: hashPassword,
			}

			req.user = newUser

			next()
		}
	} catch (error) {
		next()
	}
}

module.exports = newAccount
