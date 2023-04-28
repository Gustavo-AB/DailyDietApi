import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("users", (table) => {
        table.uuid("id")
        table.string("name")
        table.string("email")
        table.uuid("session_id")
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable("users")
}

