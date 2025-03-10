import { FastifyReply, FastifyRequest } from "fastify"
import { AdressRepository } from "src/repositories/address-repository";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository";
import { GetAddressCase } from "src/use-cases/address/get-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { z } from "zod"


export async function get(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      id: z.string().uuid()
    })
  
    const { id } = getParamsSchema.parse(request.params)
  
    try {
        const prismaAcessRepository = new PrismaAdressRepository() ; 
        const getAcessUseCase = new GetAddressCase ( prismaAcessRepository )
        const user = await getAcessUseCase.execute({
        id
        })

      return reply.status(200).send({user}) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  