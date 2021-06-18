exports.up = async (knex) => {
	await knex.schema.createTable('users', (users) => {
		users.increments()
		users.string('username', 255).notNullable().unique()
		users.string('password', 255).notNullable()
	})
	await knex.schema.createTable('jokes', (table) => {
		table.increments()
		table.string('joke', 255).notNullable()
	})
}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists('jokes')
	await knex.schema.dropTableIfExists('users')
}
