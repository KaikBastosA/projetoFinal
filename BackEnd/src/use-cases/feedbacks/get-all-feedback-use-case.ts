import { FeedBack } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"


interface GetAllFeedbacksUseCaseResponse {
    feedback: FeedBack[]
}


export class GetAllFeedbacksUseCase{

    constructor(private feedbacksRepository: FeedbacksRepository) {}

    async execute(): Promise<GetAllFeedbacksUseCaseResponse>{
        const feedback = await this.feedbacksRepository.findAll()
        
        return { feedback }
    }
    
    
}