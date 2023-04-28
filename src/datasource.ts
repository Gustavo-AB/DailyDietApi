import { env } from "./env/index"
import { knex as setupKnex, Knex } from "knex"

export const dbConfig:Knex.Config = {
    client:env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === "sqlite3" ? {
        filename: env.DATABASE_URL
    } : env.DATABASE_URL,
    useNullAsDefault:true,
    migrations:{
        extension:"ts",
        directory:"./db/migrations"
    }
}

export const knex = setupKnex(dbConfig)