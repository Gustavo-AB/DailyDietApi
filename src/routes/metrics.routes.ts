import { FastifyInstance } from "fastify";
import { knex } from "../datasource";
import { z } from "zod"
import { Knex } from "knex";



export async function metricsRoutes(server:FastifyInstance){

    server.get("/", async (request, reply)=>{
        
        const headerRequest = z.object({
            user_id: z.string()
        })

        const { user_id } = headerRequest.parse(request.headers)

        const totalMealsQuery = await knex("meals").count("id_meal").where("user_id", user_id)
        let resultQuery:any = Object.values(totalMealsQuery[0])
        const totalMeals = resultQuery[0]

        const totalDietMealsQuery = await knex("meals").sum("included").where("user_id", user_id)
        resultQuery = Object.values(totalDietMealsQuery[0])
        const totalDietMeals = resultQuery[0]

        const totalOfDietMealsQuery = await knex("meals").count("included").where("user_id", user_id).andWhere("included", 0)
        resultQuery = Object.values(totalOfDietMealsQuery[0])
        const totalOfDietMeals = resultQuery[0]

        await knex("metrics")
        .where("user_id", user_id)
        .update({
            total_meals: Number(totalMeals),
            total_diet_meals:totalDietMeals,
            total_of_diet_meals:totalOfDietMeals,
            best_sequence:totalMeals
        })

        const metrics = await knex.select("*")
        .from("metrics")
        .where("user_id", user_id)

        return metrics
        
    })

    server.delete("/",  async (request, reply)=>{

        const { user_id, metrics_id } = request.headers

        const deletedMetrics = await knex("metrics").delete().where("metrics_id", metrics_id).andWhere("user_id", user_id)

        return deletedMetrics
    })
}