const db = require('../../data/dbConfig')

const getJokes = () => {
	return db('jokes')
}
const createsJokes = async (data) => {
	const [id] = await db('jokes').insert(data)
	return await db('jokes').where('id', id).first()
}

module.exports = {getJokes, createsJokes}
