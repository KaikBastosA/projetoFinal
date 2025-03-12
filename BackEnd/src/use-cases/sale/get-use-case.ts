import { Sale } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PajamaSalesRepository } from "src/repositories/sales.repository"

interface GetSaleUseCaseRequest {
    id: string
}
interface GetSaleUseCaseResponse {
    sale: Sale
}


export class GetSaleUseCase{

    constructor(private SaleRepository: PajamaSalesRepository) {}

    async execute({id}: GetSaleUseCaseRequest): Promise<GetSaleUseCaseResponse>{
        const sale = await this.SaleRepository.get(id)
        
        if (!sale) {
            throw new ResourceNotFoundError()
        }

        return { sale }
    }
    
    
}