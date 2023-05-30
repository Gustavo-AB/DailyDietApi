import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { dailyDietServer } from "../../app";
import { GetUsersRepository } from "../../repositories/getUsersRepository";


class GetUsersController {

    constructor(server:FastifyInstance){}

    async getUserById(request:FastifyRequest, reply:FastifyReply){
        const paramsRequestSchema = z.object({
            user_id: z.string()
        })

        const headerRequest = paramsRequestSchema.safeParse(request.params)

        if(headerRequest.success){
            const user = headerRequest.data

            if(user.user_id === ''){
                return reply.status(400).send({err:"Invalid arguments!"})
            }

            try{
                const userResponse = await GetUsersRepository.getUserById(user.user_id)
                return userResponse
            } catch {
                return reply.status(500).send()
            }

        } else {
            return reply.send(headerRequest.error)
        }
    }

    async getUsers(request:FastifyRequest, reply:FastifyReply){
        try{
            const userResponse = await GetUsersRepository.getUsers()
            return userResponse
        } catch {
            return reply.status(500).send()
        }
    }
}

export const getUsersController = new GetUsersController(dailyDietServer)