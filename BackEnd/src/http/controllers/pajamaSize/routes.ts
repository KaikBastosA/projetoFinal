import { FastifyInstance } from "fastify";
import { update } from "./update";


export function sizesRoutes(app: FastifyInstance) {
    app.patch("/update-size", update)
}