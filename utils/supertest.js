const app = require('../api/server')
const data = require('../api/jokes/jokes-data')
const supertest = require('supertest')
const testing = supertest(app)

module.exports = {testing, data}
