import { FeedBack, Pajama, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaPajamaRepository {
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
        
        
        /*
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
    
}