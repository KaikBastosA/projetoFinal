import { FastifyInstance } from "fastify";
import { create } from "./create";

export function feedbacksRoutes(app: FastifyInstance) {
    app.post("/feedbacks", create)
}