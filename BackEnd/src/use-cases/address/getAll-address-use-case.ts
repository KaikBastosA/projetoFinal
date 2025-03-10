import { Address } from "@prisma/client";
import { AdressRepository } from "src/repositories/address-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


interface getAllAdressRespnse{
    address : Address[]
}


export class getAllAddressCase{
    constructor(private adressRepository: AdressRepository) { }
    async execute() : Promise<getAllAdressRespnse> {
        const address = await this.adressRepository.getAll(); 

        if (!address) throw new ResourceNotFoundError()
        
        return {address}
    }
    

}