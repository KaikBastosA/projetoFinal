import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdaPajamaCase } from "src/use-cases/pajama/update-use-case";
import { UpdateUserUseCase } from "src/use-cases/users/update-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        favorite : z.boolean().optional()
    })

    const { id } = updateParamsSchema.parse(request.params)

    const { favorite } = updateBodySchema.parse(request.body)

    try {
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const updatePajamaCase = new UpdaPajamaCase (prismaPajamaRepository )
        const user = await updatePajamaCase.execute({
            id,
            data: {
                favorite
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