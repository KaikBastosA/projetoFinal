import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { RegisterUseCase } from "src/use-cases/users/register-use-case";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, username, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({ name, username, email, password })
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            reply.status(409).send({ message: err.message })
        }
        throw err
    }

    return reply.status(201).send('User created!')
}