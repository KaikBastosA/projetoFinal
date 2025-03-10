import { FeedBack, Pajama } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"

interface GetPajamaRequest {
    id: string
}
interface GetPajamaResponse {
    pajama : Pajama
}


export class GetPajamaByIdUseCase{

    constructor(private  pajamaRepository : PrismaPajamaRepository  ) {}

    async execute({id }: GetPajamaRequest): Promise<GetPajamaResponse>{
        const pajama = await this.pajamaRepository.getById(id)
        
        if (!pajama) {
            throw new ResourceNotFoundError()
        }

        return { pajama }
    }
    
    
}