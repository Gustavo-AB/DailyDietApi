import { knex } from "../../datasource"
import { IMetricsUpdate } from "../../interfaces"


export class GetMetricsRepository {


    static async totalMeals(user_id:string){
        return await knex("meals").count("id_meal").where("user_id", user_id)
    }

    static async totalDietMeals(user_id:string){
        return await knex("meals").sum("included").where("user_id", user_id)
    }

    static async totalOfDietMeals(user_id:string){
        return await knex("meals").count("included").where("user_id", user_id).andWhere("included", 0)
    }

    static async updateMetrics(
        user_id:string,
       {
        totalMeals,
        totalDietMeals,
        totalOfDietMeals
        }:IMetricsUpdate
    ){
        
        await knex("metrics")
        .where("user_id", user_id)
        .update({
            total_meals: Number(totalMeals),
            total_diet_meals:totalDietMeals,
            total_of_diet_meals:totalOfDietMeals,
            best_sequence:totalMeals
        })
    }

    static async getMetrics(user_id:string){

        const metrics = await knex.select("*")
        .from("metrics")
        .where("user_id", user_id)

        return metrics
    }
}