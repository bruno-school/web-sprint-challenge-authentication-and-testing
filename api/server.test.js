const {testing, data} = require('../utils/supertest')
const db = require('../data/dbConfig')
const 
beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
	await db.seed.run()
})

beforeEach(async () => {
	await db('jokes').truncate()
})

afterEach(async () => {
	await db.destroy()
})

describe('START', () => {
	test('sanity', () => {
		expect(true).toBe(true)
	})

	it('is running on the coreect ENV', () => {
		expect(process.env.NODE_ENV).toEqual('testing')
	})
})

// MODELs Testing
describe('[jokes] Model', () => {
	it('creates joke to the db', async () => {
		const expected = await testing.get('/api/jokes')
    let jokes 


		expect(expected.body[0].id).toEqual(data[0].id)
	})
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
