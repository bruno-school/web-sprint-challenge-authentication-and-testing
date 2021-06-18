const newAccount = (req, res, next) => {
	const {username, password} = req.body
	// 1- In order to register a new account the client must provide `username` and `password`:
	//   {
	//     "username": "Captain Marvel", // must not exist already in the `users` table
	//     "password": "foobar"          // needs to be hashed before it's saved
	//   }

	if (!username || !password) {
		next({status: 400, message: 'Username and Password are required...'})
	}
	next()
}

module.exports = newAccount
