import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository";
import { CreateSaleCase } from "src/use-cases/sale/create-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const pajamaSchema = z.object({
        pajamaId: z.string(),
        quantidade: z.number(),
        tamanho: z.string(),
    });
    
    
    const registerBodySchema = z.object({
        //sale
        buyer_name: z.string(),
        cpf: z.string(),
        price: z.number(),
        payment_method: z.string() ,
        installments: z.number().optional() ,
        card_number: z.string().optional() ,

        //address
        zip_code: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number: z.string(),
        pajamas: z.array(pajamaSchema)

        

    })

    const { buyer_name, cpf, price, payment_method, installments, card_number, zip_code, state, city,
        neighborhood , address , number , pajamas
     } = registerBodySchema.parse( request.body )

    try {
        const prismaAdressRepository = new PrismaAdressRepository()
        const prismaSaleRepository = new PrismaSaleRepository ()
        const createSaleCase = new CreateSaleCase ( prismaSaleRepository ,  prismaAdressRepository  ); 
        
        await createSaleCase.execute({ 
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
        })
        

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Sale Created')
}

