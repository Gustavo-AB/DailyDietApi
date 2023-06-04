import { env } from "./env/index"
import { dailyDietServer } from "./app";
import { usersRoutes } from "./routes/users.routes";
import cookie from '@fastify/cookie'
import { createMeals } from "./routes/meals.routes";
import { metricsRoutes } from "./routes/metrics.routes";
import cors from '@fastify/cors'




dailyDietServer.register(cors, {
    origin:"*",
    methods:['POST', 'GET', 'PUT', 'DELETE']
})

dailyDietServer.register(cookie)

dailyDietServer.register(metricsRoutes, {
    prefix:"metrics"
})

dailyDietServer.register(createMeals, {
    prefix:"/meals"
})

dailyDietServer.register(usersRoutes, {
    prefix:"/users"
})

dailyDietServer.listen({
    port:env.PORT
}).then(()=>{
    console.log("Server is running!")
})
