import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { get } from "./get";
import { update } from "./update";
import { deleteAdress } from "./delete";


export function addressRoutes(app: FastifyInstance) {
    app.post("/address", create)
    app.get("/all-address", getAll)
    app.get("/address/:id", get)
    app.patch("/address/:id", update)
    app.delete("/address/:id" , deleteAdress)
}

