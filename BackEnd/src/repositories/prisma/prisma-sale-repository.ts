import { prisma } from "src/lib/prisma";
import { SizeUpdateInput } from "../pajamaSize-repository";
import { Address, PajamaSize, Prisma, Sale } from "@prisma/client";
import { AdressRepository } from "../address-repository";
import { PajamaSalesRepository } from "../sales.repository";


export class PrismaSaleRepository implements  PajamaSalesRepository {

    async delete(id: string): Promise<Sale | null> {
        const sale = await prisma.sale.delete({
            where: {
                id: id
            }
        })
        return sale
    }

    async create(data: Prisma.SaleUncheckedCreateInput ) : Promise<Sale | null > {
        const sale = await prisma.sale.create({
            data
        })
        return sale; 
    }

    async get(id: string): Promise<Sale | null> {
        const sale = await prisma.sale.findUnique({
            where: {
                id
            }
        })
        return sale
    }
     
}