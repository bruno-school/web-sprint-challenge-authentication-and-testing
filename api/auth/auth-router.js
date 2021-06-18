const router = require('express').Router()
const tokenGenarator = require('../../utils/token')
const {newAccount, validateUser} = require('../middleware/newAccount')
const User = require('../auth/auth-model')

router.post('/register', newAccount, async (req, res, next) => {
	try {
		const [id] = await User.add(req.user)
		const newUser = await User.getById(id)
		res.status(201).json(newUser)
	} catch (error) {
		next(error)
	}
})

router.post('/login', validateUser, (req, res) => {
	const userToken = tokenGenarator(req.user)

	res.status(200).json({
		message: `welcome, ${req.user.username}`,
		token: userToken,
	})
})

module.exports = router
