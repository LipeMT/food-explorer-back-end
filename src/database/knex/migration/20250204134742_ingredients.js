exports.up = knex => knex.schema.hasTable("ingredients")
    .then(exists => {
        if (!exists) {
            return knex.schema.createTable("ingredients", table => {
                table.increments("id")
                table.text("name").notNullable()

                table.integer("user_id").references("id").inTable("users")
                table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE")
            })
        }
    })

exports.down = knex => knex.schema.dropTableIfExists("ingredients");
