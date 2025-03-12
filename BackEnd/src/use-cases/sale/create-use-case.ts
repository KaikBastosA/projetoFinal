import { Sale } from "@prisma/client";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { PrismaSizeRepository } from "src/repositories/prisma/prisma-pajamaSize-repository";
import { Insufficient_stock } from "../errors/insufficient-stock-quantity-error";
import { PrismaSale_PajamaRepository } from "src/repositories/prisma/prisma-salePajama.repository";

interface CreateSaleCaseRequest {
    //sale
    buyer_name: string;
    cpf: string;
    price: number;
    payment_method: string;
    installments?: number;
    card_number?: string;
    
    //address
    zip_code: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;

    pajamas : PajamaRequest[]
}



export interface PajamaRequest{
    pajamaId: string
    quantidade: number
    tamanho : string

}

//   [  {"id-pijama" , "tamanho" , "quantidade" } ,    {"id-pijama" , "tamanho" , "quantidade" }   ]

interface CreateSaleResponse {
    sale: Sale | null ;
}
export class CreateSaleCase {
    constructor( private saleRepository: PrismaSaleRepository, private addressRepository: PrismaAdressRepository ) {}

    async execute({
        buyer_name,
        cpf,
        price,
        payment_method,
        installments,
        card_number,
        zip_code,
        state,
        city,
        neighborhood,
        address,
        number,
        pajamas 
        
    }: CreateSaleCaseRequest): Promise<CreateSaleResponse> {
        

        const sizeRepository = new PrismaSizeRepository()
        const sale_pajamaRepository = new PrismaSale_PajamaRepository()
        const pajamaRepository = new PrismaPajamaRepository(); 
        

        //verificação de quantidade
        for (let i = 0; i < pajamas.length; i++) {
            const pajamaSize = await  sizeRepository.find(pajamas[i].pajamaId, pajamas[i].tamanho  )
            if(!pajamaSize) throw new ResourceNotFoundError()
            if( pajamaSize.stock_quantity < pajamas[i].quantidade  ) throw new  Insufficient_stock()
        }

        

        const endereco = await this.addressRepository.create({
            zip_code,
            state,
            city,
            neighborhood,
            address,
            number
        });
        
        if( !endereco) throw new InvalidCredentialsError()

        const sale = await this.saleRepository.create({
            buyer_name,
            cpf,
            price,
            payment_method,
            installments,
            card_number,
            addressId : endereco.id
        });

        if(!sale) throw new ResourceNotFoundError()

        for (let i = 0; i < pajamas.length;  i++){
            
            const pajama = await pajamaRepository.getById(pajamas[i].pajamaId)
            
            if(!pajama) throw new InvalidCredentialsError()

            await sale_pajamaRepository.firstOrCreate({
                saleId: sale.id,
                pajamasId: pajamas[i].pajamaId,
                quantity: pajamas[i].quantidade,
                price : pajama.price
                
            })
            const pajamaSize = await sizeRepository.find(pajama.id, pajamas[i].tamanho)
            if( !pajamaSize) throw new ResourceNotFoundError()

            const new_estoque = pajamaSize.stock_quantity - pajamas[i].quantidade 
            
            
            

            await sizeRepository.update(pajamaSize.id, {
                stock_quantity : new_estoque
            })

        }


        return {sale } ; 
        
        

        
    }
}
