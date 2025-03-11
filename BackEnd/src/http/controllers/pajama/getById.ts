import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetPajamaByIdUseCase } from "src/use-cases/pajama/getById-use-case";
import { GetUserUseCase } from "src/use-cases/users/get-use-case";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    try {
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const getPajama = new GetPajamaByIdUseCase(prismaPajamaRepository)
        const user = await getPajama.execute({
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