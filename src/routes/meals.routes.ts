import { FastifyInstance } from "fastify";
import { checkHeader } from "../middlewares/checkHeader";
import { createMealController } from "../controllers/Meal/createMealController";
import { getMealsController } from "../controllers/Meal/getMealsController";
import { updateMealController } from "../controllers/Meal/updateMealController";
import { deleteMealController } from "../controllers/Meal/deleteMealController";


export async function createMeals(server:FastifyInstance){
    
    server.post("/",  {preHandler:checkHeader}, createMealController.createMeal)

    server.get("/user_meal", {preHandler:checkHeader}, getMealsController.getMealByUserId)

    server.get("/meal", getMealsController.getMealById)

    server.get("/", getMealsController.getMeals)

    server.put("/meal",  updateMealController.updateMeal)

    server.delete("/meal", {preHandler:checkHeader}, deleteMealController.deleteMeal)
}