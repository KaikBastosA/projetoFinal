import { FastifyInstance } from "fastify";
import { update, updateAllForTable } from "./update";


export function sizesRoutes(app: FastifyInstance) {
    app.patch("/update-size", update)
    app.patch("/up" , updateAllForTable )
}