import { FastifyInstance } from "fastify";
import { create } from "./create";



export function saleRoutes(app: FastifyInstance) {
    app.post("/create-sale", create )
}