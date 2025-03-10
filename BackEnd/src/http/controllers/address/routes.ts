import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";


export function addressRoutes(app: FastifyInstance) {
    app.post("/address", create)
    app.get("/all-adress" , getAll)
}