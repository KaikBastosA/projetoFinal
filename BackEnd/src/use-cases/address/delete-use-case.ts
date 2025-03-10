import { Address } from "@prisma/client"
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface DeleteAddressRequest{
    id : string
}

interface DeleteAdressResponse{
    address : Address
}


export class DeleteAddressCase{
    constructor(private prismaAdressRepository: PrismaAdressRepository) { }
    
    async execute({ id }: DeleteAddressRequest): Promise<DeleteAdressResponse> {
        const address = await this.prismaAdressRepository.delete(id)
        
        if (!address) throw new ResourceNotFoundError()
        
        return { address }
    }    

}
