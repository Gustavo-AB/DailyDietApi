import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { dailyDietServer } from "../../app";
import { GetUsersRepository } from "../../repositories/getUsersRepository";


class GetUsersController {

    constructor(server:FastifyInstance){}

    async getUser(request:FastifyRequest, reply:FastifyReply){
        const headerRequestSchema = z.object({
            session_id: z.string()
        })

        const headerRequest = headerRequestSchema.safeParse(request.headers)

        if(headerRequest.success){
            const user = headerRequest.data

            if(user.session_id === ''){
                return reply.status(400).send({err:"Invalid arguments!"})
            }

            try{
                const userResponse = await GetUsersRepository.getUser(Number(user.session_id))
                return userResponse
            } catch {
                return reply.status(500).send()
            }

        } else {
            return reply.send(headerRequest.error)
        }
    }
}

export const getUsersController = new GetUsersController(dailyDietServer)