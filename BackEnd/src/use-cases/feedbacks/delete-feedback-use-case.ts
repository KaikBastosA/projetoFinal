import { FeedBack } from "@prisma/client"
import { error } from "console"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"


interface DeleteFeedbackUseCaseRequest {
    feedbackId: string
}
interface DeleteFeedbackUseCaseResponse {
    feedback: FeedBack
}


export class DeleteFeedbackUseCase{

    constructor(private feedbacksRepository: FeedbacksRepository) {}

    async execute({feedbackId}: DeleteFeedbackUseCaseRequest): Promise<DeleteFeedbackUseCaseResponse>{
        const feedback = await this.feedbacksRepository.delete(feedbackId)
        
        if (!feedback) {
            throw error("Feedback not found")
        }

        return { feedback }
    }
    
    
}