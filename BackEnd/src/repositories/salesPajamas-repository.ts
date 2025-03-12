import { PajamaSize, Prisma, Sale_Pajamas } from "@prisma/client"



export interface Sale_PajamaRepository{
    
    create(data: Prisma.Sale_PajamasUncheckedCreateInput ) : Promise<Sale_Pajamas | null >
    firstOrCreate( data : Prisma.Sale_PajamasUncheckedCreateInput  ) : Promise<Sale_Pajamas>
}