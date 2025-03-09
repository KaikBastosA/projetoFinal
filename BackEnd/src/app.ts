import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";

export const app = fastify()

app.register(feedbacksRoutes)
app.register(userRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error', issues: error.format()})
    }
    return reply.status(500).send({ message: 'Internal server error' })
})