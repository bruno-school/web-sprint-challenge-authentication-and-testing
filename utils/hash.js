const bcrypt = require('bcrypt')

class Password {
	cosntructor() {
		this.hashPassword = ''
	}
	async hash(password) {
		const salt = await bcrypt.genSalt(8)

		const hashPassword = await bcrypt.hash(password, salt)
		this.hashPassword = hashPassword

		return hashPassword
	}

	async validPassword(password) {
		const result = await bcrypt.compare(password, this.hashPassword)
		return result
	}
}

module.exports = new Password()
