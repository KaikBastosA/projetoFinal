import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-address-repository";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";
import { PrismaSaleRepository } from "src/repositories/prisma/prisma-sale-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "src/use-cases/errors/user-already-exists";
import { CreatePajmaUseCase } from "src/use-cases/pajama/create-use-case";
import { CreateSaleCase } from "src/use-cases/sale/create-use-case";
import { RegisterUseCase } from "src/use-cases/users/register-use-case";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
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
        number :  z.string()  
    })

    const { buyer_name, cpf, price, payment_method, installments, card_number, zip_code, state, city,
        neighborhood , address , number
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
            neighborhood, address,
            number
        })
        

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Sale Created')
}

