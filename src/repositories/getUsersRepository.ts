import { knex } from "../datasource"

export class GetUsersRepository {

    static async getUser(session_id:number){
        const users = await knex("users").select().where("session_id", session_id)

        return users
    }
}