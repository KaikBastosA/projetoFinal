import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory";
import { CreateFeedbackUseCase } from "src/use-cases/feedbacks/create-feedback-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        rating: z.number()
    })

    const { name, description, rating } = createBodySchema.parse(request.body)

    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const createFeedbackUseCase = new CreateFeedbackUseCase(prismaFeedbacksRepository)

        await createFeedbackUseCase.execute({ 
            name,
            description, 
            rating 
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send("Feedback created successfully")
}