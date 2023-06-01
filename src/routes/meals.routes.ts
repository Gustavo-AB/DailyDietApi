import { FastifyInstance } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"
import { checkHeader } from "../middlewares/checkHeader";
import { validator } from "../validators/validateData";
import { createMealController } from "../controllers/Meal/createMealController";
import { getMealsController } from "../controllers/Meal/getMealsController";


export async function createMeals(server:FastifyInstance){
    
    server.post("/",  createMealController.createMeal)

    server.get("/user_meal", {preHandler:checkHeader}, getMealsController.getMealByUserId)

    server.get("/meal", getMealsController.getMealById)

    server.get("/", getMealsController.getMeals)

    server.put("/meal", {preHandler:checkHeader}, async (request, reply) => {

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