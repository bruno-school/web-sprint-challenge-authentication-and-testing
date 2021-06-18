const {testing, data} = require('../utils/supertest')
const db = require('../data/dbConfig')
const Jokes = require('./jokes/jokes_model')

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

beforeEach(async () => {
	await db('users').truncate()
	await db('jokes').truncate()
})

afterAll(async () => {
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
describe('[Create Joke] POST /api/jokes', () => {
	it('creates joke to the db', async () => {
		let jokes
		await Jokes.createsJokes({joke: 'joke test'})
		jokes = await db('jokes')
		expect(jokes).toHaveLength(1)
	})
	test('should return an object with joke id and joke', async () => {
		const joke = await Jokes.createsJokes({joke: 'joke test'})

		expect(joke).toMatchObject({id: 1, joke: 'joke test'})
	})
})

describe('[Create Joke] GET /api/jokes', () => {
	test('should return jokes', async () => {
		await Jokes.createsJokes({joke: 'joke test'})
		const jokes = await Jokes.getJokes()

		expect(jokes).toHaveLength(1)
	})
	test('should return a single joke', async () => {
		await Jokes.createsJokes({joke: 'joke test'})
		const jokes = await db('jokes').where('id', 1).first()
		expect(jokes).toMatchObject({
			id: 1,
			joke: 'joke test',
		})
	})
})

describe('[Register] POST /api/auth/register', () => {
	test('should register a user and hash a token', async () => {
		const register = await testing
			.post('/api/auth/register')
			.send({username: 'bruno3043', password: '1234'})

		expect(register.body).toMatchObject({
			id: 1,
			username: 'bruno3043',
		})
	})

	test('should return a 201 status', async () => {
		const register = await testing
			.post('/api/auth/register')
			.send({username: 'bruno3043', password: '1234'})

		expect(register.status).toEqual(201)
	})
})

describe('[Login]', () => {
	test('should login the user', async () => {
		await testing
			.post('/api/auth/register')
			.send({username: 'bruno', password: '1234'})

		const user = await testing
			.post('/api/auth/login')
			.send({username: 'bruno', password: '1234'})

		const jokes = await testing
			.get('/api/jokes')
			.set('Accept', 'application/json')
			.set('Authorization', user.body.token)
		expect(jokes.body).toHaveLength(3)
	})
	test('should return the second joke by id', async () => {
		await testing
			.post('/api/auth/register')
			.send({username: 'bruno', password: '1234'})

		const user = await testing
			.post('/api/auth/login')
			.send({username: 'bruno', password: '1234'})

		const jokes = await testing
			.get('/api/jokes')
			.set('Accept', 'application/json')
			.set('Authorization', user.body.token)
		expect(jokes.body[1]).toMatchObject({
			id: '08EQZ8EQukb',
			joke:
				"Did you hear about the guy whose whole left side was cut off? He's all right now.",
		})
	})
})
