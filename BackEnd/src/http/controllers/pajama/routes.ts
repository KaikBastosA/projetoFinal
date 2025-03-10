
import { FastifyInstance } from "fastify";
import { create } from "./create";


export function pajamaRoutes(app: FastifyInstance) {
    
    app.post('/pajamas', create )
}