import { FastifyInstance } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"
import { checkHeader } from "../middlewares/checkHeader";
import { validator } from "../validators/validateData";
import { createMealController } from "../controllers/Meal/createMealController";


export async function createMeals(server:FastifyInstance){
    
    server.addHook("preHandler",checkHeader)

    server.post("/", createMealController.createMeal)

    server.get("/", async (request, reply)=>{
        
        const { user_id } = request.headers

        const meals = await knex("meals").select().where("user_id", user_id)

        return meals
    })

    server.get("/meal", async (request, reply)=>{

        const { user_id } = request.headers
        const readerRequest = z.object({
            id_meal: z.string()
        })

        const { id_meal } = readerRequest.parse(request.headers)
        
        const meal = await knex("meals").select()
            .where("id_meal", id_meal)
            .andWhere("user_id", user_id)

        return meal
    })

    server.put("/meal", async (request, reply) => {

        const { user_id, meal_id } = request.headers
        const data:any = request.body

        const meal = await knex("meals").update({
            meal_name:data.meal_name,
            meal_description:data.meal_description,
            meal_datetime:data.meal_datetime,
            included:data.included

        })
        .where("user_id", user_id)
        .andWhere("id_meal", meal_id)

        return { meal }
    })

    server.delete("/meal", async (request, reply)=>{

        const { user_id, meal_id } = request.headers

        const deletedUser = await knex("meals").delete().where("id_meal", meal_id).andWhere("user_id", user_id)
        await knex("metrics").delete().where("user_id", user_id)

        return deletedUser
    })
}