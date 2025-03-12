import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository"
import { GetSaleUseCase } from "src/use-cases/sale/get-use-case"

export async function get(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaSaleRepository = new PrismaSaleRepository()
        const getSaleUseCase = new GetSaleUseCase(prismaSaleRepository)

        const {sale} = await getSaleUseCase.execute({
            id    
        })

        return reply.status(200).send(sale)

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}