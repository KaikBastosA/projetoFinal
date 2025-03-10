import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify()

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(feedbacksRoutes)
app.register(userRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Erro de validação', issues: error.format()})
    }
    return reply.status(500).send({ message: 'Erro interno no servidor'})
})