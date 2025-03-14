import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository"
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository"
import { GetFavoritesPajamaCase } from "src/use-cases/pajama/findManyFavorites-use-case"
import { GetOnSalesPajamaCase } from "src/use-cases/pajama/finManyOnsale-use-case"
import { GetAllPajamaCase } from "src/use-cases/pajama/getAll-use-case"
import { GetAllUsersUseCase } from "src/use-cases/users/get-all-use-case"

export async function findOnSales(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const prismaPajamaRepository = new PrismaPajamaRepository()
        const getOnsalePajama = new GetOnSalesPajamaCase( prismaPajamaRepository )
        const { pajamas } = await getOnsalePajama.execute()

        return reply.status(200).send(pajamas)
    } catch (err) {
        console.error("Error on get all users", err)
        return reply.status(500).send({ message: "Internal server error" })
    }



}