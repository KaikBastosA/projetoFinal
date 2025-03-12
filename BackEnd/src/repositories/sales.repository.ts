import { PajamaSize, Prisma, Sale } from "@prisma/client"




export interface PajamaSalesRepository{
    create(data: Prisma.SaleUncheckedCreateInput ): Promise<Sale | null>
    //delete(id: string): Promise<Sale | null>
    get(id: string): Promise<Sale | null> 
    delete(id: string): Promise<Sale | null>
    //get(id: string): Promise<Sale | null> 
    //update
}