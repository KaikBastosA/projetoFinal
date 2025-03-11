import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { pajamaRoutes } from "./http/controllers/pajama/routes";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import { sizesRoutes } from "./http/controllers/pajamaSize/routes";
import { saleRoutes } from "./http/controllers/sale/routes";


export const app = fastify()

app.register(fastifyCors , {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(fastifyJwt , {
    secret: env.JWT_SECRET
})

app.register(feedbacksRoutes)
app.register(userRoutes)
app.register(pajamaRoutes)
app.register(sizesRoutes)
app.register( saleRoutes ) 


