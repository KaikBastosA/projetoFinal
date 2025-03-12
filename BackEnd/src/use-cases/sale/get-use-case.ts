import { Sale, Sale_Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PajamaSalesRepository } from "src/repositories/sales.repository"
import { Sale_PajamaRepository } from "src/repositories/salesPajamas-repository"

interface GetSaleUseCaseRequest {
    id: string
}
interface GetSaleUseCaseResponse {
    sale: Sale
    quantidade : number
}


export class GetSaleUseCase{

    constructor(private SaleRepository: PajamaSalesRepository , private sale_pajamaRepository : Sale_PajamaRepository ) {}

    async execute({id}: GetSaleUseCaseRequest): Promise<GetSaleUseCaseResponse>{
        const sale = await this.SaleRepository.get(id)
        
        if (!sale) {
            throw new ResourceNotFoundError()
        }

        const table = await this.sale_pajamaRepository.listBySale(sale.id)
        let quantidade = 0
        for (const element of table) {
            quantidade += element.quantity
        }

        return {  sale , quantidade }

    }
    
    
}