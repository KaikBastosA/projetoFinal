import { FeedBack, Pajama, Prisma } from "@prisma/client";

export interface UpdatePajamaInput{
    favorite    ?: boolean
}


export interface  PajamaRepository {
    create(data: Prisma.PajamaCreateInput ) : Promise<Pajama | null >
    delete(id: string): Promise<Pajama | null>
    getAll(): Promise<Pajama[] | null>
    getByid( id : string ) : Promise<Pajama | null>
    update(id: string, data: UpdatePajamaInput): Promise<Pajama | null>

    findManyFavorite(): Promise<Pajama[] | null>
    
}