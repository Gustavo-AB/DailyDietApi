import { knex } from "../../datasource"


export class DeleteUserRepository{

    static async deleteUser(user_id:string){
        

        await knex("users").delete().where("id", user_id)
        await knex("meals").delete().where("user_id", user_id)
        await knex("metrics").delete().where("user_id", user_id)


    }
}