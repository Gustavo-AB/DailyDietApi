import { knex } from "../../datasource"

export class GetUsersRepository {

    static async getUserById(user_id:string){
        return await knex("users").select().where("id", user_id)
    }

    static async getUsers(){
        return await knex("users").select("*")
    }
}