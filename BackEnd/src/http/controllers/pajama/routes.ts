
import { FastifyInstance } from "fastify";
import { create, createMultiple } from "./create";
import { deletePajama } from "./delete";
import { getAll } from "./getAll";
import { get } from "./getById";
import { update } from "./update";


export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajamas', create)
    app.post('/pajamas/multiple', createMultiple)
    app.delete('/pajamas/:id', deletePajama)
    app.get('/all-pajamas', getAll)
    app.get("/pajamas/:id", get)
    app.patch("/pajama/updateFavorite/:id" , update )
}