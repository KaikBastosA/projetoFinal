import { Address, FeedBack, Pajama, Sale } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

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

    //pajamas : PajamaRequest[]
}

/*

interface PajamaRequest{
    pajamaId: string
    quantidade: number
    tamanho : number 

}
*/


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
        number
    }: CreateSaleCaseRequest): Promise<CreateSaleResponse> {
        
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

        return {sale } ; 
        
        
    }
}
