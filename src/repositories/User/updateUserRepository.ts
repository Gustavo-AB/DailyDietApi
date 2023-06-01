import { knex } from "../../datasource"
import { IUserRequest } from "../../interfaces"


export class UpdateUserRepository {

    static async updateUser(data:any, user_id:string){
        return await knex("users")
        .returning("*")
        .update({
            name:data.name,
            email:data.email
        }).where("id", user_id)
    }
}