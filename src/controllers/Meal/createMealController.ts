import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import { z } from "zod";
import { dailyDietServer } from "../../app";
import { CreateMealRepository } from "../../repositories/Meal/createMealRepositories";


class CreateMealController {

    constructor(server:FastifyInstance){}

    async createMeal(request:FastifyRequest, reply:FastifyReply){

        const mealRequestSchema = z.object({
            meal_name: z.string(),
            meal_description: z.string(),
            included: z.boolean()
        })

        const { user_id } = request.headers

        if(!user_id || user_id === ""){
            return reply.status(400).send({ err:`${user_id} is empty`})
        }

        const mealRequest = mealRequestSchema.safeParse(request.body)

        if (mealRequest.success) {
            const { data } = mealRequest;

            for (const key in data) {

                if (data.hasOwnProperty(key)) {

                    const value = data[key as keyof typeof data];

                    if(value === ""){
                        return reply.status(400).send({ err:`${key} is empty!`})
                    }
                }
            }

            try {

                const meal = await CreateMealRepository.createMeal(data, String(user_id))
                return reply.status(201).send(meal)

            } catch {

                return reply.status(500).send()
            }

        } else {

            return mealRequest.error;
        }

        return reply.status(201).send()
    }
}

export const createMealController = new CreateMealController(dailyDietServer)
