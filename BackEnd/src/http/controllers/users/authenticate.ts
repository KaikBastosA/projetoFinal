import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "src/use-cases/users/autheticate-use-case";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const autheticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = autheticateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const autheticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const { user } = await autheticateUseCase.execute({ email, password })
        
        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send({ token })
    } catch (err) {
        return reply.status(401).send()
    }
}