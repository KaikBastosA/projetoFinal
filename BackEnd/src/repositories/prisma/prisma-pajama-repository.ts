import { FeedBack, Pajama, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { PajamaRepository, UpdatePajamaInput } from "../pajama-repository";

export class PrismaPajamaRepository  {
    async create(data: Prisma.PajamaCreateInput ) : Promise<Pajama | null > {
        const pajama = await prisma.pajama.create({
            data
        })

        await  prisma.pajamaSize.createMany({
            data: [
                { stock_quantity: 0, size: 'PP', pajamaId: pajama.id },
                { stock_quantity: 0, size: 'P', pajamaId: pajama.id },
                { stock_quantity: 0, size: 'M', pajamaId: pajama.id },
                { stock_quantity: 0, size: 'G', pajamaId: pajama.id },
                { stock_quantity: 0, size: 'GG', pajamaId: pajama.id }
            ]
        })
        
        
        /* código de update do pajama
        const pismaSize = await prisma.pajamaSize.findFirst({
            where : {
                pajamaId : pajama.id,
                size : "P"
            }
        })
        */
        
        
        return pajama; 
        
    }
    async delete(id: string){
        const pajama = await prisma.pajama.delete({
            where: {
                id
            }
        })
        
        return pajama; 
    }
    
    async getAll() : Promise< Pajama[] | null> {
        const pajamas = await prisma.pajama.findMany( )
        return pajamas;
    }

    async getById(id: string): Promise<Pajama | null>{
        const pajama = await prisma.pajama.findUnique({
            where: {
                id
            },
             include: { size: true } 
        })
        return pajama; 
    }



    async update(id: string , data : Prisma.PajamaUpdateInput ): Promise<Pajama | null> {
        const pajama = await prisma.pajama.update({
            where: {
                id
            },
            data
        })
        
        return pajama

    }

}