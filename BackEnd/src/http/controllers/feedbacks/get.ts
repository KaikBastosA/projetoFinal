import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory"
import { GetFeedbackUseCase } from "src/use-cases/feedbacks/get-feedback-use-case"

export async function get(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        feedbackId: z.string().uuid()
    })

    const { feedbackId } = getParamsSchema.parse(request.params)

    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const getFeedbackUseCase = new GetFeedbackUseCase(prismaFeedbacksRepository)

        const feedback = await getFeedbackUseCase.execute({
            feedbackId    
        })

        return reply.status(200).send({ feedback })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}