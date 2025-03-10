
import { Address, Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { AdressRepository } from "../address-repository";

export class PrismaAdressRepository implements AdressRepository  {
    async create(data: Prisma.AddressCreateInput )  : Promise< Address | null > {
        const address = prisma.address.create({
            data
        })
        return address;

    }

    async delete(id: string) : Promise< Address | null > {
        const address = prisma.address.delete({
            where: {
                id
            }
        })
        return address;
    }

    async getAll(): Promise<Address[] | null > {
        const address = prisma.address.findMany()
        return address; 
    }


    async update(id: string, data: Prisma.AddressUpdateInput) : Promise<Address | null>  {
        const address = await prisma.address.update({
            where: {
                id
            },
            data 
            
        })
        return address; 
    }


    async findById(id: string) : Promise<Address | null>  {
        const adress = await prisma.address.findUnique({
            where: {
                id 
            }
        })
        return adress; 
    }

}