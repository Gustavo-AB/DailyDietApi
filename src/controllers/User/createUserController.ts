import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { knex } from "../../datasource";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid"
import { dailyDietServer } from "../../app";
import { UserRepository } from "../../repositories/createUserRepositories";


export class CreateUserController { 

    constructor(server:FastifyInstance){ }

    async createUser(request:FastifyRequest, reply:FastifyReply){
        const userRequestSchema = z.object({
            name: z.string(),
            email: z.string()
        })

        const userRequest = userRequestSchema.safeParse(request.body)   
    
        if(userRequest.success){
            const user = userRequest.data

            if(user.name === "" || user.email === ""){
                return reply.status(400).send({err:"Invalid arguments"})
            }

            try{
                UserRepository.createUserRepository(user)
                return reply.status(201).send({ success:"Success"})
            } catch {
                return reply.status(500).send()
            }
            
        } else {
            return reply.send(userRequest.error)
        }
    }
}

export const createUserController = new CreateUserController(dailyDietServer)



// export async function createUser(server:FastifyInstance, request:FastifyRequest, reply:FastifyReply){
//     // const userRequest = z.object({
//     //     name: z.string(),
//     //     email: z.string()
//     // })

//     // const { name, email } = userRequest.parse(request.body)     
//     // const idGenerator = uuidv4() 

//     await knex("users").insert({
//         id:uuidv4(),
//         name,
//         email,
//         session_id:uuidv4(),   
//     })

//     await knex('metrics').insert({
//         metrics_id:uuidv4(),
//         user_id:idGenerator,
//         total_diet_meals:0,
//         total_meals:0,
//         total_of_diet_meals:0,
//         best_sequence:0
//     })

//     console.log('Funfou')

//     return reply.status(201).send()
    
// }
