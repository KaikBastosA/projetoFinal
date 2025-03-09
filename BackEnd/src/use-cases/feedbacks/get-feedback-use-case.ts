import { FeedBack } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface GetFeedbackUseCaseRequest {
    feedbackId: string
}
interface GetFeedbackUseCaseResponse {
    feedback: FeedBack
}


export class GetFeedbackUseCase{

    constructor(private feedbacksRepository: FeedbacksRepository) {}

    async execute({feedbackId}: GetFeedbackUseCaseRequest): Promise<GetFeedbackUseCaseResponse>{
        const feedback = await this.feedbacksRepository.findById(feedbackId)
        
        if (!feedback) {
            throw new ResourceNotFoundError()
        }

        return { feedback }
    }
    
    
}