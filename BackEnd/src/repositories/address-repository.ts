//adressrepository.ts
import { Address, Prisma } from "@prisma/client";

export interface AdressUpdateInput {
    zip_code ?: string
    state ?:string
    city  ?:string
    neighborhood ?: string
    adres ?: string
    number ?: string
}

export interface AdressRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address | null>
    delete(id: string ) : Promise< Address | null >
    //findById(id: string)
    getAll(): Promise<Address[] | null >
    //update(id: string, data: UserUpdateInput): Promise<User | null>

    
}