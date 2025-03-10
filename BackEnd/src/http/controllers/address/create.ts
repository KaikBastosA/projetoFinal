import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory";
import { CreateAddressCase } from "src/use-cases/address/create-address-use-case";
import { CreateFeedbackUseCase } from "src/use-cases/feedbacks/create-feedback-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        zip_code :z.string(),
        state : z.string(),
        city  : z.string(),
        neighborhood : z.string(),
        adres : z.string(),
        number : z.string()   
    })

    const { zip_code , state , city , neighborhood , adres , number  } = createBodySchema.parse(request.body)

    try {
        const prismaAdressRepository = new PrismaAdressRepository()
        const createAdressUseCase = new CreateAddressCase(prismaAdressRepository )

        await createAdressUseCase.execute({ 
            zip_code,
            state,
            city,
            neighborhood,
            adres,
            number
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send("Feedback created successfully")
}