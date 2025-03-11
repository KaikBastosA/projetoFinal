import { PajamaSize } from "@prisma/client"


export interface SizeUpdateInput{
    stock_quantity?: number
    //size ?: string
}


export interface PajamaSizeRepository{
    update(id: string, data: SizeUpdateInput) : Promise<PajamaSize | null>
    
    find(pajamaId: string, tamanho: string) : Promise<PajamaSize | null>
    
}