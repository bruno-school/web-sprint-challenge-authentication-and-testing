exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('jokes')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('jokes').insert([
				{
					joke:
						"I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.",
				},
				{
					joke:
						"Did you hear about the guy whose whole left side was cut off? He's all right now.",
				},
				{
					joke:
						'Why didn’t the skeleton cross the road? Because he had no guts.',
				},
			])
		})
}
