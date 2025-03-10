
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

import { Address } from "@prisma/client";
import { AdressRepository, AdressUpdateInput } from "src/repositories/address-repository";

interface UpdateAdressCaseRequest {
    id: string
    data : AdressUpdateInput
}

interface UpdateAdressCaseResponse {
    address : Address
}

export class UpdateAdressUseCase {
    constructor(private adressRepository: AdressRepository) {}

    async execute({id , data  }: UpdateAdressCaseRequest ): Promise<UpdateAdressCaseResponse> {
        const address = await this.adressRepository.findById(id)

        if(!address) throw new ResourceNotFoundError()
       

       const addressUpdated = await this.adressRepository.update(id, data)
       if (!addressUpdated) {
            throw new ResourceNotFoundError()
       }
       return { address : addressUpdated }
       
    }
}


