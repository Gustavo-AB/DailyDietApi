import { Knex } from "knex"

declare module "knex/types/tables" {
    export interface Tables {
        users:{
            id:string,
            name:string,
            email:string,
            session_id?:string,
            created_at:Date
        },

        meals:{
            id_meal: string
            user_id: string
            meal_name: string
            meal_description: string
            meal_datetime: Date
            included: boolean
        },

        metrics:{
            metrics_id:string
            user_id:string
            total_meals:number
            total_diet_meals:number
            total_of_diet_meals:number
            best_sequence:number
        }
    }
}