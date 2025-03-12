import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { GetAllUsersUseCase } from "src/use-cases/users/get-all-use-case"

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)
        const { users } = await getAllUsersUseCase.execute()

        return reply.status(200).send(users)
    } catch (err) {
        console.error("Error on get all users", err)
        return reply.status(500).send({ message: "Internal server error" })
    }
}