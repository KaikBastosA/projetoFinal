import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteFeedback } from "./delete";
import { get } from "./get";
import { getAll } from "./get-all";

export function feedbacksRoutes(app: FastifyInstance) {
    app.post("/feedbacks", create)

    app.delete("/feedbacks/:feedbackId", deleteFeedback)

    app.get("/feedbacks/:feedbackId", get)
    app.get("/all-feedbacks", getAll)
}