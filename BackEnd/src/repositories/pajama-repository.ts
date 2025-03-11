import { FeedBack, Pajama, Prisma } from "@prisma/client";

interface UpdatePajamaRepositoryUser{
    favorite?: string
    on_sale?: boolean

}


export interface  PajamaRepository {
    create(data: Prisma.PajamaCreateInput ) : Promise<Pajama | null >
    delete(id: string): Promise<Pajama | null>
    getAll(): Promise<Pajama[] | null>
    getByid( id : string ) : Promise<Pajama | null>
    
}