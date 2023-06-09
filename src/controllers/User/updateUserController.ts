import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { UpdateUserRepository } from "../../repositories/User/updateUserRepository";


export class UpdateUserController {

    async updateUser(request:FastifyRequest, reply:FastifyReply){

        const paramsRequestSchema = z.object({
            user_id: z.string()
        })

        const paramsRequest = paramsRequestSchema.safeParse(request.params)

        if(paramsRequest.success){

            const { data } = paramsRequest

            if(data.user_id === ""){
                return reply.status(400).send({err:"Invalid arguments!"})
            } 

            try{
                const user = await UpdateUserRepository.updateUser(request.body, data.user_id)
                return reply.status(201).send(user)

            } catch {
                return reply.status(500).send()
            }

        } else {
            return reply.status(400).send(paramsRequest.error)
        }
    }
}

export const updateUserController = new UpdateUserController()