import { knex } from "../../datasource"



export class DeleteMealRepository {

    static async deleteMeal(user_id:string, meal_id:string ){

        await knex("meals")
        .returning("*")
        .delete()
        .where("id_meal", meal_id)
        .andWhere("user_id", user_id)

        await knex("metrics").delete().where("user_id", user_id)
    }
}