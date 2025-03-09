import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/users/get-use-case";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = getParamsSchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute({
            userId
        })

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}