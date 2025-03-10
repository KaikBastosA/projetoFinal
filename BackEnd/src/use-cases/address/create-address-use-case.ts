//create Adress Use caase.ts

import { Address } from "@prisma/client";
import { AdressRepository } from "src/repositories/address-repository";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";

interface  CreateAdressRequest{
    zip_code : string
    state :string
    city  :string
    neighborhood : string
    adres : string
    number : string    
}
interface CreateAdressResponse  {
    address : Address  | null
}

export class  CreateAddressCase {
    constructor(private createAddressRepository : AdressRepository )  {}

    async execute({zip_code , state , city , neighborhood , adres , number}: CreateAdressRequest  ) : Promise<CreateAdressResponse>   {
        const address = await this.createAddressRepository.create({
            zip_code,
            state,
            city,
            neighborhood,
            adres,
            number
        })
        

        return { address}

    }
}