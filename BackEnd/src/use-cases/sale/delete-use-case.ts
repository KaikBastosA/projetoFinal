import { Sale } from "@prisma/client"
import { PajamaSalesRepository } from "src/repositories/sales.repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface DeleteSaleUseCaseRequest {
    saleId: string
}

interface DeleteSaleUseCaseResponse {
    sale: Sale
}

export class DeleteSaleUseCase {
    constructor(private salesRepository: PajamaSalesRepository) {}

    async execute({ saleId }: DeleteSaleUseCaseRequest): Promise<DeleteSaleUseCaseResponse> {
        const sale = await this.salesRepository.delete(saleId)

        if (!sale) {
            throw new ResourceNotFoundError()
        }

        return { sale }
    }
}