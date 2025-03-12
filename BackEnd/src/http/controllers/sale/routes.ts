import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { deleteSale } from "./delete";



export function saleRoutes(app: FastifyInstance) {
    app.post("/create-sale", create )
    app.get("/get-sale/:id", get)

    app.delete("/sales/:saleId", deleteSale)
}