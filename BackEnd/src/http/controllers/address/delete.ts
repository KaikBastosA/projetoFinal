import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { DeleteAddressCase } from "src/use-cases/address/delete-use-case"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { DeleteUserUseCase } from "src/use-cases/users/delete-use-case"
import { z } from "zod"

export async function deleteAdress(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaAdressRepository = new PrismaAdressRepository()
        const deleteAddressUseCase = new DeleteAddressCase( prismaAdressRepository )
        const user = await deleteAddressUseCase.execute({
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