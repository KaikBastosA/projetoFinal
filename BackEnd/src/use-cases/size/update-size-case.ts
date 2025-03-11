import { PajamaSize } from "@prisma/client"
import { PajamaRepository } from "src/repositories/pajama-repository"
import { SizeUpdateInput } from "src/repositories/pajamaSize-repository"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { PrismaSizeRepository } from "src/repositories/prisma/prisma-pajamaSize-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface UpdateSizeRequest{
    pajamaId: string
    tamanho: string
    data : SizeUpdateInput

}

interface UpdateSizeResponse{
    pajamaSize : PajamaSize 
}

export class UpdateSizeCase{
    constructor( private pajamaRepository : PrismaPajamaRepository , private sizeRepository : PrismaSizeRepository  ) {}

    async execute({ pajamaId, tamanho, data }: UpdateSizeRequest) : Promise<UpdateSizeResponse>  {
        
        const pajama = await this.pajamaRepository.getById(pajamaId);
        if (!pajama) throw new ResourceNotFoundError()
        
        const p_size =  await this.sizeRepository.find( pajama.id, tamanho); 
        if (!p_size) throw new ResourceNotFoundError()
        
        const pajamaSize = await this.sizeRepository.update( p_size.id , data )
        if (!pajamaSize) throw new ResourceNotFoundError()

        return { pajamaSize }  ; 

    }


}