import { knex } from "../../datasource";


export class GetMealsRepository {

    static async getMealByUserId(user_id:string){

        return await knex("meals").select().where("user_id", user_id)
    }

    static async getMealById(meal_id:string){

        const meal = await knex("meals").select().where("id_meal", meal_id)

        return meal
    }

    static async getMeals(){

        return await knex("meals").select()
    }
}