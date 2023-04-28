import { FastifyInstance } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"


export async function createMeals(server:FastifyInstance){
    server.post("/", async (request, reply)=>{
        const requestObject = z.object({
            meal_name: z.string(),
            meal_description: z.string(),
            included: z.boolean()
        })

        const headerRequest = z.object({
            user_id: z.string()
        })

        const { user_id } = headerRequest.parse(request.headers)

        const { meal_name, meal_description, included } = requestObject.parse(request.body)
        
        await knex("meals").insert({
            id_meal:uuidv4(),
            user_id,
            meal_name,
            meal_description,
            included
        })

        return reply.status(201).send()
    })

    server.get("/", async (request, reply)=>{
        const requestQuery = z.object({
            user_id: z.string()
        })
        const { user_id } = requestQuery.parse(request.query)
        
        const meals = await knex("meals").select().where("user_id", user_id)

        return meals
    })

    server.get("/meal", async (request, reply)=>{

        const requestHeader = z.object({
            user_id: z.string(),
            id_meal: z.string()
        })
        const { user_id, id_meal } = requestHeader.parse(request.headers)

        const meal = await knex("meals").select()
            .where("id_meal", id_meal)
            .andWhere("user_id", user_id)

        return meal
    })
}