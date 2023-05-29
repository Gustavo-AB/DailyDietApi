import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"
import { createUserController } from "../controllers/User/createUserController"
import { getUsersController } from "../controllers/User/getUsersController";



export async function usersRoutes(server:FastifyInstance){

    server.post("/",   createUserController.createUser)

    server.get("/", getUsersController.getUser)

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