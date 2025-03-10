
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePajama } from "./delete";
import { getAll } from "./getAll";
import { get } from "./getById";


export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajamas', create)
    app.delete('/pajamas/:id', deletePajama); 
    app.get('/all-pajamas', getAll)
    app.get("/pajamas/:id" , get)
}