exports.up = knex => knex.schema.hasTable('users')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("users", table => {
                table.increments("id")
                table.text("name").notNullable()
                table.text("email").notNullable()
                table.text("password").notNullable()
                table.text("avatar")

                table.enum("role", ["admin", "customer"], { useNative: true, enumname: "roles" }).notNullable().defaultTo("customer")

                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
            })
        }
    })
    
exports.down = knex => knex.schema.dropTableIfExists('users');
