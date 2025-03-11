import { prisma } from "src/lib/prisma";
import { SizeUpdateInput } from "../pajamaSize-repository";
import { Address, PajamaSize, Prisma, Sale } from "@prisma/client";
import { AdressRepository } from "../address-repository";
import { PajamaSalesRepository } from "../sales.repository";


export class PrismaSaleRepository implements  PajamaSalesRepository {

    async create(data: Prisma.SaleUncheckedCreateInput ) : Promise<Sale | null > {
        const sale = await prisma.sale.create({
            data
        })
        return sale; 
    }
     
}