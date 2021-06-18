const {testing, data} = require('../utils/supertest')

// Write your tests here
test('sanity', () => {
	expect(true).toBe(true)
})

describe('[GET] Route', () => {
	it('matches the first joke object id', async () => {
		const expected = await testing.get('/api/jokes')

		expect(expected.body[0].id).toEqual(data[0].id)
	})
})

describe('[AUTH]', () => {
	test('should be able to register with username and password ', async () => {
		const res = await testing
			.post('/api/auth/register')
			.send({username: 'bruno'})
		expect(res.body).toMatchObject({
			username: 'test',
			password: '238485sdd',
		})
	})
})
