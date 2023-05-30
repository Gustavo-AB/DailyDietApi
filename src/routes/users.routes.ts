import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod"
import { knex } from "../datasource";
import { v4 as uuidv4 } from "uuid"
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