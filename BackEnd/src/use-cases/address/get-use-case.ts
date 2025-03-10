import { Address, User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { AdressRepository } from "src/repositories/address-repository";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository";

interface GetAdressCaseRequest {
    id: string
}

interface GetAdressCaseResponse {
    address: Address
}

export class GetAddressCase {
    constructor(private adressRepository: PrismaAdressRepository ) {}

    async execute({id}: GetAdressCaseRequest): Promise<GetAdressCaseResponse> {
       const address = await this.adressRepository.findById(id)

       if (!address) {
            throw new ResourceNotFoundError()
       }

       return { address }
    }
}