import { env } from "./env/index"
import { fastify } from "fastify";
import { usersRoutes } from "./routes/users.routes";
import cookie from '@fastify/cookie'
import { createMeals } from "./routes/meals.routes";
import { metricsRoutes } from "./routes/metrics.routes";
import { checkHeader } from "./middlewares/checkHeader";


const dailyDietServer = fastify()

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