const bcrypt = require('bcrypt')

class Password {
	async hash(password) {
		const salt = await bcrypt.genSalt(8)

		const hashPassword = await bcrypt.hash(password, salt)
		return hashPassword
	}
}

module.exports = new Password()
