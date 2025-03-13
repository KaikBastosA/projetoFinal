
import { FastifyInstance } from "fastify";
import { create, createMultiple } from "./create";
import { deletePajama } from "./delete";
import { getAll } from "./getAll";
import { get } from "./getById";
import { update } from "./update";
import { findFavorites } from "./findFavorites";
import { findOnSales } from "./findOnSale";


export function pajamaRoutes(app: FastifyInstance) {
    app.post('/pajamas', create)
    app.post('/pajamas/multiple', createMultiple)
    app.delete('/pajamas/:id', deletePajama)
    app.get('/all-pajamas', getAll)
    app.get("/pajamas/:id", get)
    app.patch("/pajama/updateFavorite/:id", update)
    app.get("/pajama/favorites", findFavorites)
    app.get("/pajama/on_sale", findOnSales )

}