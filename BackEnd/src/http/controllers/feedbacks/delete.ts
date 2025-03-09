import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory";
import { DeleteFeedbackUseCase } from "src/use-cases/feedbacks/delete-feedback-use-case";
import { z } from "zod"

export async function deleteFeedback(request: FastifyRequest,reply: FastifyReply) {
    const getParamsSchema = z.object({
        feedbackId: z.string().uuid()
    })

    const { feedbackId } = getParamsSchema.parse(request.params)

    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
        const deleteFeedbackUseCase = new DeleteFeedbackUseCase(prismaFeedbacksRepository);

        const feedback = await prismaFeedbacksRepository.findById(feedbackId);
        if (!feedback) {
            return reply.status(404).send({ message: "Comentário não encontrado" });
        }
        await deleteFeedbackUseCase.execute({ feedbackId });

        return reply.status(204).send();

    } catch (err) {
        throw err
}
}