import { knex } from "../../datasource";
import { IMealRequest } from "../../interfaces";


export class UpdateMealrepository {

    static async updateMeal(data:any, user_id:string, meal_id:string){

        return await knex("meals")
        .returning("*")
        .update({
            meal_name:data.meal_name,
            meal_description:data.meal_description,
            meal_datetime: new Date(),
            included:data.included
        })
        .where("user_id", user_id)
        .andWhere("id_meal", meal_id)
    }
}
