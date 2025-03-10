import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { addressRoutes } from "./http/controllers/address/routes";

export const app = fastify()

app.register(feedbacksRoutes)
app.register(userRoutes)
app.register(addressRoutes)