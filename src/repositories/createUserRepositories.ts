import { knex } from "../datasource";
import { IUserRequest } from "../interfaces";
import { v4 as uuidv4 } from "uuid"


export class UserRepository {

    static async createUserRepository(user:IUserRequest){
        const { name, email } = user
        await knex("users").insert({
            id:uuidv4(),
            name,
            email,
            session_id:uuidv4(),   
        })

        const idGenerator = uuidv4() 
        
        await knex('metrics').insert({
            metrics_id:uuidv4(),
            user_id:idGenerator,
            total_diet_meals:0,
            total_meals:0,
            total_of_diet_meals:0,
            best_sequence:0
        })
    }
}