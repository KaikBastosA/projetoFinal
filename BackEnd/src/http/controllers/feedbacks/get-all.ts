import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory"
import { GetAllFeedbacksUseCase } from "src/use-cases/feedbacks/get-all-feedback-use-case"

export async function getAll(request: FastifyRequest,reply: FastifyReply) {
    
    try {
        const prismaFeedbackRepository = new PrismaFeedbacksRepository()
        const getAllFeedbacksUseCase = new GetAllFeedbacksUseCase(prismaFeedbackRepository)

        const feedbacks = await getAllFeedbacksUseCase.execute()

        return reply.status(200).send({ feedbacks })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}