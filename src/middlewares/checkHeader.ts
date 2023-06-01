import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { GetUsersRepository } from "../repositories/User/getUsersRepository"


export async function checkHeader(request:FastifyRequest, reply:FastifyReply){

    const readerRequest = z.object({
        user_id: z.string()
    })

    const { user_id } = readerRequest.parse(request.headers)

    if(!user_id || user_id === ""){
        return reply.status(400).send({
            error:"Bad request"
        })
    } else {

        const user = await GetUsersRepository.getUserById(user_id)

        if(user.length === 0){
            
            return reply.status(400).send({ err:"User not found!"})
        }
    }
}