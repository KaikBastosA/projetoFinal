import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeleteSaleUseCase } from "src/use-cases/sale/delete-use-case";
import { z } from "zod";

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        saleId: z.string().uuid()
    })

    const { saleId } = getParamsSchema.parse(request.params)

    try {
        const prismaSaleRepository = new PrismaSaleRepository()
        const deleteSaleUseCase = new DeleteSaleUseCase(prismaSaleRepository)
        const sale = await deleteSaleUseCase.execute({
            saleId
        })

        return reply.status(200).send(sale)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}