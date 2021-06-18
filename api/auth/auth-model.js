const db = require('../../data/dbConfig')

const getById = (id) => {
	return db('users').where('id', id).first()
}
const add = (data) => {
	return db('users').insert(data)
}

module.exports = {add, getById}