

export interface Meals {
    id_meal: string
    user_id: string
    meal_name: string
    meal_description: string
    meal_datetime: Date
    included: boolean
}

export interface IUserRequest {
    name?:string
    email?:string
}

export interface IMealRequest {
    meal_name?:string
    meal_description?:string
    included?:boolean
}

export interface IMetricsUpdate{
    totalMeals:any,
    totalDietMeals:any,
    totalOfDietMeals:any

}