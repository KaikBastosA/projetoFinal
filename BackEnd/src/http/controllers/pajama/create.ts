import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { CreatePajmaUseCase } from "src/use-cases/pajama/create-use-case";
import { RegisterUseCase } from "src/use-cases/users/register-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number() ,
        season: z.string() ,
        type: z.string(),
        gender: z.string(),
        favorite: z.boolean(),
        on_sale: z.boolean(),
        sale_percent : z.number().optional()
    })

    const { name , description , image , price , season , type , gender , favorite , on_sale , sale_percent } = registerBodySchema.parse(request.body)

    try {
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const registerUseCase = new CreatePajmaUseCase(prismaPajamaRepository); 
        await registerUseCase.execute({ name , description , image , price , season , type , gender , favorite , on_sale , sale_percent })

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Pajama created')
}

export async function createMultiple(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.array(z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number(),
        season: z.string(),
        type: z.string(),
        gender: z.string(),
        favorite: z.boolean(),
        on_sale: z.boolean(),
        sale_percent: z.number().optional()
    }))

    const pajamas = registerBodySchema.parse(request.body)

    try {
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const registerUseCase = new CreatePajmaUseCase(prismaPajamaRepository);

        for (const pajama of pajamas) {
            await registerUseCase.execute(pajama)
        }

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Pajamas created')
}