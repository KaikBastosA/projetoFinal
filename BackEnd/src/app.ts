import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { pajamaRoutes } from "./http/controllers/pajama/routes";


export const app = fastify()

app.register(feedbacksRoutes)
app.register(userRoutes)
app.register(pajamaRoutes)


