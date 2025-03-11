import { prisma } from "src/lib/prisma";
import { SizeUpdateInput } from "../pajamaSize-repository";
import { Address, PajamaSize, Prisma } from "@prisma/client";
import { AdressRepository } from "../address-repository";


export class PrismaAdressRepository implements  AdressRepository{

    async create(data: Prisma.AddressCreateInput) : Promise<Address | null > {
        const address = await prisma.address.create({
            data
        })
        return address;
    }
     
    

}