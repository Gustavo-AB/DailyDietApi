import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod";
import { GetMealsRepository } from "../../repositories/Meal/getMealsRepository";


class GetMealsController {

    async getMealByUserId(request:FastifyRequest, reply:FastifyReply){

        const { user_id } = request.headers
    
        const user = await GetMealsRepository.getMealByUserId(String(user_id))

        return reply.status(200).send(user)
    }

    async getMealById(request:FastifyRequest, reply:FastifyReply){

        const headerRequestSchema = z.object({
            id_meal: z.string()
        })

        const headerRequest = headerRequestSchema.safeParse(request.headers)

        if(headerRequest.success){

            const { id_meal } = headerRequest.data

            if(id_meal === ""){

                return reply.status(400).send({ err:`${id_meal} is empty!`})
            } 

            const meal = await GetMealsRepository.getMealById(id_meal)

            if(meal.length === 0){
                 return reply.status(400).send({ err:`id_meal not found!`})
            }

            return reply.status(200).send(meal)

        } else {

            return reply.status(500).send(headerRequest.error)
        }
    }

    async getMeals(){

        return await GetMealsRepository.getMeals()
    }
}

export const getMealsController = new GetMealsController()
