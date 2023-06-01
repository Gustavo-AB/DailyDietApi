import { IMealRequest } from "../../interfaces";
import { knex } from "../../datasource";
import { v4 as uuidv4 } from "uuid"


export class CreateMealRepository {

    static async createMeal(meal:IMealRequest, user_id:string){

        const { meal_name, meal_description, included} = meal
        return await knex("meals")
        .returning("*")
        .insert({
            id_meal:uuidv4(),
            user_id,
            meal_name,
            meal_description,
            included
        })
    }
}