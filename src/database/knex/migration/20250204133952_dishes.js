exports.up = knex => knex.schema.hasTable("dishes")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("dishes", table => {
                table.increments("id")
                table.text("name").notNullable()
                table.text("image")
                table.text("category").notNullable()
                table.text("description").notNullable()
                table.text("price").notNullable()
                table.integer("user_id").references("id").inTable("users")

                table.timestamp("created_at").default(knex.fn.now())
                table.timestamp("updated_at").default(knex.fn.now())
            })
        }
    });
exports.down = knex => knex.schema.dropTableIfExists("dishes");
