import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function checkHeader(request:FastifyRequest, reply:FastifyReply){

    const readerRequest = z.object({
        user_id: z.string()
    })

    const { user_id } = readerRequest.parse(request.headers)

    if(!user_id || user_id === ""){
        return reply.status(400).send({
            error:"Bad request"
        })
    } 
}