
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod";
import { GetMealsRepository } from "../../repositories/Meal/getMealsRepository";
import { DeleteMealRepository } from "../../repositories/Meal/deleteMealRepository";


class DeleteMealController {

    async deleteMeal(request:FastifyRequest, reply:FastifyReply){

        const { user_id, meal_id } = request.headers

        if(!meal_id || meal_id === ""){

            return reply.status(400).send({ err:"meal_id is empty!"})
        } else {

            const mealExists = await GetMealsRepository.getMealById(String(meal_id))

            console.log(mealExists)

            if(mealExists.length === 0){

                return reply.status(400).send({ err:"Meal does not exist!"})
            }

            try{
                return await DeleteMealRepository.deleteMeal(String(user_id), String(meal_id))

            } catch {
                return reply.status(500).send()
            }
        }        
    }
}


export const deleteMealController = new DeleteMealController()