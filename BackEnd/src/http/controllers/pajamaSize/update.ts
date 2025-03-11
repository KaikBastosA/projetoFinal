import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaSizeRepository } from "src/repositories/prisma/prisma-pajamaSize-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdateSizeCase } from "src/use-cases/size/update-size-case";
import { UpdateUserUseCase } from "src/use-cases/users/update-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
    const updateBodySchema = z.object({
        pajamaId: z.string(),
        tamanho: z.string(),
        stock_quantity: z.number().optional(),
        //size : z.string().optional()
    })

    
    //const { pajamaId , tamanho , stock_quantity, size } = updateBodySchema.parse(request.body)
    const { pajamaId , tamanho , stock_quantity } = updateBodySchema.parse(request.body)


    try {
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const prismaSizeRepository = new PrismaSizeRepository()
        const updateSizecase = new UpdateSizeCase( prismaPajamaRepository , prismaSizeRepository )

        const user = await updateSizecase.execute({
            pajamaId,
            tamanho,
            data: {
                stock_quantity,
                //size 
            }
        })

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}