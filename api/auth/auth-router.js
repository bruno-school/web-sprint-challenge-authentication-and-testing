const router = require('express').Router()

const newAccount = require('../middleware/newAccount')
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

router.post('/login', (req, res) => {
	res.end('implement login, please!')
	/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
})

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({error: err.message})
})

module.exports = router
