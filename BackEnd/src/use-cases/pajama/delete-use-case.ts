import { FeedBack, Pajama } from "@prisma/client"
import { error } from "console"
import { FeedbacksRepository } from "src/repositories/feedbacks-repository"
import { PajamaRepository } from "src/repositories/pajama-repository"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"



interface DeletePajamaRequest {
    id : string
}
interface DeletePajamaResponse {
    pajama : Pajama 
}



export class DeletePajamaCase{

    constructor(private feedbacksRepository: PrismaPajamaRepository  ) {}

    async execute( {id} :  DeletePajamaRequest ): Promise<DeletePajamaResponse>{
        const  pajama = await this.feedbacksRepository.delete(id)
        
        if (!pajama) throw new ResourceNotFoundError(); 

        return {  pajama }
    }
    
    
}