import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { DeletePajamaCase } from "src/use-cases/pajama/delete-use-case"
import { DeleteUserUseCase } from "src/use-cases/users/delete-use-case"
import { z } from "zod"

export async function deletePajama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id : z.string()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaPajamaRepository()
        const deletUseCase = new DeletePajamaCase(prismaUsersRepository)
        const user = await deletUseCase.execute({
            id
        })

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}