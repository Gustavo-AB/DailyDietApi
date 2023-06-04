import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod";
import { GetMealsRepository } from "../../repositories/Meal/getMealsRepository";
import { UpdateMealrepository } from "../../repositories/Meal/updateMealRepository";
import { IMealRequest } from "../../interfaces";

class UpdateMealController {

    async updateMeal(request:FastifyRequest, reply:FastifyReply){

        
        const requestHeaderSchema = z.object({
            meal_id: z.string()
        })
        const requestHeader = requestHeaderSchema.safeParse(request.headers)
        const { user_id } = request.headers

        if(requestHeader.success){

            const { data } = requestHeader
            const requestData = request.body

            if(data.meal_id === ""){

                return reply.status(400).send({ err:`meal_id is empty!`})
            }

            const mealExists = await GetMealsRepository.getMealById(data.meal_id)

            if(mealExists.length === 0){
                 return reply.status(400).send({ err:"meal does not exists!"})
            }

            try{
                
                const meal = await UpdateMealrepository.updateMeal(requestData, String(user_id), data.meal_id)
                return meal

            } catch {

                return reply.status(500).send()
            }


        } else {

            return requestHeader.error
        }
    }
}


export const updateMealController = new UpdateMealController