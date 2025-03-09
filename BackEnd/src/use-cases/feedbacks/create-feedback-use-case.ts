import { FeedBack } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface CreateFeedbackUseCaseRequest {
    name: string;
    description: string;
    rating: number;
}
interface CreateFeedbackUseCaseResponse {
    feedback: FeedBack
}

export class CreateFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository){}

    async execute({name, description, rating}: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
        const feedback = await this.feedbacksRepository.create({
            name,
            description,
            rating
        })

        return { feedback }

    }
}