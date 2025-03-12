import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sale_PajamaRepository } from "../salesPajamas-repository";
import { prisma } from "src/lib/prisma";


export class PrismaSale_PajamaRepository implements  Sale_PajamaRepository {

    async create(data: Prisma.Sale_PajamasUncheckedCreateInput ) : Promise< Sale_Pajamas | null > {
        const sale = await prisma.sale_Pajamas.create({
            data
        })
        return sale; 
    }

    async firstOrCreate(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas> {
        
        const salePajama = await prisma.sale_Pajamas.upsert({
            where: {
                saleId_pajamasId: { 
                    saleId: data.saleId,
                    pajamasId : data.pajamasId
                } 

            },
            update: { 
                quantity: {
                    increment: data.quantity
                },
                price: {
                    increment : data.price
                }
            },
            create : data
        })

        return salePajama; 

    }
     
}