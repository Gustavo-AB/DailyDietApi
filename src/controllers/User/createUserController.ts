import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { UserRepository } from "../../repositories/User/createUserRepositories";


export class CreateUserController { 

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
                const userResponse = await UserRepository.createUserRepository(user)
                return reply.status(201).send(userResponse)
            } catch {
                return reply.status(500).send()
            }
            
        } else {
            return reply.send(userRequest.error)
        }
    }
}

export const createUserController = new CreateUserController()
