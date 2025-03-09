import fastify from "fastify";
import { feedbacksRoutes } from "./http/controllers/feedbacks/routes";

export const app = fastify()

app.register(feedbacksRoutes)