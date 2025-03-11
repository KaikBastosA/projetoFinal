import { prisma } from "src/lib/prisma";
import { SizeUpdateInput } from "../pajamaSize-repository";
import { PajamaSize } from "@prisma/client";


export class PrismaSizeRepository{

    async update(id : string, data: SizeUpdateInput): Promise<PajamaSize | null>{
        
        const size = await prisma.pajamaSize.update({
            where: {
                id
            },
            data
        })
        return size;

    }

    async find(pajamaId: string, tamanho: string) : Promise<PajamaSize | null> {
        const pajamaSize = await prisma.pajamaSize.findFirst({
            where : {
                pajamaId : pajamaId,
                size : tamanho
            }
        })
        return pajamaSize
    }

    

}