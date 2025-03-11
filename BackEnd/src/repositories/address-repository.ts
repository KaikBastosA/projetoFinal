import { Address, FeedBack, Pajama, Prisma } from "@prisma/client";


export interface  AdressRepository  {
    create(data: Prisma.AddressCreateInput ) : Promise<Address | null >
}