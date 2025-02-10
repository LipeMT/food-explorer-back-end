exports.up = knex => knex.schema.hasTable("categories")
    .then(exists => {
        if (!exists) {
            return knex.schema.createTable("categories", table => {
                table.increments("id")
                table.text("name").notNullable()

                table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
            })
        }
    })

exports.down = knex => knex.schema.dropTableIfExists("ingredients");
