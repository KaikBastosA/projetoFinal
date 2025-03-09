import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteFeedback } from "./delete";

export function feedbacksRoutes(app: FastifyInstance) {
    app.post("/feedbacks", create)

    app.delete("/feedbacks/:feedbackId", deleteFeedback)
}