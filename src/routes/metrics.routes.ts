import { FastifyInstance } from "fastify";
import { checkHeader } from "../middlewares/checkHeader";
import { getMetricsController } from "../controllers/Metrics/getMetricsController";



export async function metricsRoutes(server:FastifyInstance){

    server.get("/", {preHandler:checkHeader}, getMetricsController.getMetrics)
}