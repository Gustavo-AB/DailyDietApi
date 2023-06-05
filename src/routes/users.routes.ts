import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/User/createUserController"
import { getUsersController } from "../controllers/User/getUsersController";
import { updateUserController } from "../controllers/User/updateUserController";
import { deleteUserController } from "../controllers/User/deleteUserController";



export async function usersRoutes(server:FastifyInstance){

    server.post("/",   createUserController.createUser)

    server.get("/:user_id", getUsersController.getUserById)

    server.get("/", getUsersController.getUsers)

    server.put("/:user_id", updateUserController.updateUser)

    server.delete("/:user_id", deleteUserController.deleteUser)
}