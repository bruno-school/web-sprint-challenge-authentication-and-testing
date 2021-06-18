const db = require('../../data/dbConfig')

const bcrypt = require('bcrypt')

const hash = async (password) => {
	const salt = await bcrypt.genSalt(8)
	const hashPassword = await bcrypt.hash(password, salt)
	return hashPassword
}

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
			// const salt = await bcrypt.genSalt(8)
			// const hashPassword = await bcrypt.hash(password, salt)

			const hashPass = await hash(password)
			const newUser = {
				username: username.trim(),
				password: hashPass,
			}

			req.user = newUser

			next()
		}
	} catch (error) {
		next()
	}
}

const validateUser = async (req, res, next) => {
	const {username, password} = req.body

	if ((!username, !password)) {
		next({status: 400, message: 'username and password required'})
	}
	try {
		const user = await db('users').where('username', username).first()

		if (!user) {
			next({status: 401, message: 'Invalid credentials'})
		} else {
			console.log(user)
			const validadtePassword = bcrypt.compareSync(
				password,
				user.password
			)
			console.log(validadtePassword)
			if (validadtePassword) {
				req.user = user
				next()
			} else {
				next({status: 401, message: 'Invalid credentials'})
			}
		}
	} catch (error) {
		next(error)
	}
	next()
}

module.exports = {newAccount, validateUser}
