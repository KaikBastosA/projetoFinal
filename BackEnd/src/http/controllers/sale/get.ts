import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository"
import { GetSaleUseCase } from "src/use-cases/sale/get-use-case"
import { PrismaSale_PajamaRepository } from "src/repositories/prisma/prisma-salePajama.repository"

export async function get(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const sale_pajamaRepository = new PrismaSale_PajamaRepository()
        const prismaSaleRepository = new PrismaSaleRepository()
        const getSaleUseCase = new GetSaleUseCase(prismaSaleRepository ,  sale_pajamaRepository  )

        const { sale, quantidade } = await getSaleUseCase.execute({
            id
        });
    
        return reply.status(200).send({ sale, quantidade });
    

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}
