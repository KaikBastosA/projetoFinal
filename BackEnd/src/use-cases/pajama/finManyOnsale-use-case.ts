import { FeedBack, Pajama } from "@prisma/client"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


export interface GetPajamaOnSaResponse {
    pajamas : Pajama[] 
}

export class GetOnSalesPajamaCase{

    constructor(private pajamaRepository: PrismaPajamaRepository ) {}

    async execute(): Promise<GetPajamaOnSaResponse> {
        const pajamas  = await this.pajamaRepository.findManyOnSale()
        
        if(!pajamas) throw new ResourceNotFoundError()
        return { pajamas }
    }
    
    
}