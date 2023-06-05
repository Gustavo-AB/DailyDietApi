import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod";
import { GetMetricsRepository } from "../../repositories/Metrics/getMetricsRepository";


class GetMetricsController {

    async getMetrics(request:FastifyRequest, reply:FastifyReply){

        
        const { user_id } = request.headers

        const totalMealsQuery = await GetMetricsRepository.totalMeals(String(user_id))
        let resultQuery:any = Object.values(totalMealsQuery[0])
        const totalMeals = resultQuery[0]

        const totalDietMealsQuery = await GetMetricsRepository.totalDietMeals(String(user_id))
        resultQuery = Object.values(totalDietMealsQuery[0])
        const totalDietMeals = resultQuery[0]

        const totalOfDietMealsQuery = await GetMetricsRepository.totalOfDietMeals(String(user_id))
        resultQuery = Object.values(totalOfDietMealsQuery[0])
        const totalOfDietMeals = resultQuery[0]

        await GetMetricsRepository.updateMetrics(String(user_id), {totalMeals, totalDietMeals, totalOfDietMeals})

        const metrics = await GetMetricsRepository.getMetrics(String(user_id))

        return metrics

    }
}


export const getMetricsController = new GetMetricsController()