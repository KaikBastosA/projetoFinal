import { FeedBack, Pajama } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetAllPajamaUseCaseResponse {
    pajamas : Pajama[] 
}

export class GetAllPajamaCase{

    constructor(private pajamaRepository: PrismaPajamaRepository ) {}

    async execute(): Promise<GetAllPajamaUseCaseResponse> {
        const pajamas  = await this.pajamaRepository.getAll()
        
        if(!pajamas) throw new ResourceNotFoundError()
        return { pajamas }
    }
    
    
}