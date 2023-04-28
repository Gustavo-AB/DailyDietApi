import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable("metrics", (table)=>{
        table.uuid("metrics_id")
        table.uuid("user_id")
        table.foreign("user_id").references("user.id")
        table.integer("total_meals")
        table.integer("total_diet_meals")
        table.integer("total_of_diet_meals")
        table.integer("best_sequence")
    })
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable("metrics")
}

