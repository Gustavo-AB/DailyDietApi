import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { dailyDietServer } from "../../app";
import { UserRepository } from "../../repositories/createUserRepositories";
import { DeleteUserRepository } from "../../repositories/deleteUserRepository";


class DeleteUserController {

    constructor(server:FastifyInstance){}

    async deleteUser(request:FastifyRequest, reply:FastifyReply){
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
                await DeleteUserRepository.deleteUser(data.user_id)
                return reply.status(200).send({ success:"User has been deleted!"})

            } catch {
                return reply.status(500).send()
            }
        }
    }

}

export const deleteUserController = new DeleteUserController(dailyDietServer)