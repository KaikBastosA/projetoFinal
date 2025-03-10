import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error"
import { PrismaFeedbacksRepository } from "src/repositories/prisma/prisma-feedbacks-repostory"
import { GetAllFeedbacksUseCase } from "src/use-cases/feedbacks/get-all-feedback-use-case"
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository"
import { getAllAddressCase } from "src/use-cases/address/getAll-address-use-case"

export async function getAll(request: FastifyRequest,reply: FastifyReply) {
    
    try {
        const prismaAdressRepository = new PrismaAdressRepository()
        const getAllAdressUseCase = new getAllAddressCase(prismaAdressRepository)

        const address = await getAllAdressUseCase.execute()

        return reply.status(200).send( address )

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}