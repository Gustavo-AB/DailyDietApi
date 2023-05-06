import { FastifyInstance } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"



export async function usersRoutes(server:FastifyInstance){

    server.post("/", async (request, reply)=>{
        const userRequest = z.object({
            name: z.string(),
            email: z.string()
        })

        const { name, email } = userRequest.parse(request.body)     
        const idGenerator = uuidv4() 

        await knex("users").insert({
            id:uuidv4(),
            name,
            email,
            session_id:uuidv4(),   
        })

        await knex('metrics').insert({
            metrics_id:uuidv4(),
            user_id:idGenerator,
            total_diet_meals:0,
            total_meals:0,
            total_of_diet_meals:0,
            best_sequence:0
        })

        return reply.status(201).send()
    })

    server.get("/", async (request, reply)=>{

        const headerRequest = z.object({
            session_id: z.string()
        })

        const { session_id } = headerRequest.parse(request.headers)
        
        const users = await knex("users").select().where("session_id", session_id)

        return users
    })

    server.put("/", async (request, reply)=>{

        const requestHeader = z.object({
            user_id: z.string()
        })

        const data:any  = request.body
        const { user_id } = requestHeader.parse(request.headers)

        await knex("users")
        .update({
            name:data.name,
            email:data.email
        }).where("id", user_id)

        const user = knex("users").select().where("id", user_id)

       return user
    })

    server.delete("/", async (request, reply) => {

        const requestHeader = z.object({
            user_id: z.string()
        })
        const { user_id } = requestHeader.parse(request.headers)

        const user = await knex("users").select().where("id", user_id)

        await knex("users").delete().where("id", user_id)
        await knex("meals").delete().where("user_id", user_id)
        await knex("metrics").delete().where("user_id", user_id)

        return reply.status(204).send(user)
    })
}