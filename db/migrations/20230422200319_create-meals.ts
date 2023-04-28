import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("meals", (table)=>{
        table.uuid("id_meal")
        table.string("user_id")
        table.foreign("user_id").references("users.id")
        table.string("meal_name")
        table.string("meal_description")
        table.timestamp("meal_datetime").defaultTo(knex.fn.now())
        table.boolean("included")
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable("meals")
}

