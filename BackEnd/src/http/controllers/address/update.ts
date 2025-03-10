import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAdressRepository } from "src/repositories/prisma/prisma-adress-repository";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UpdateAdressUseCase } from "src/use-cases/address/update-address-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdateUserUseCase } from "src/use-cases/users/update-use-case";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        zip_code : z.string().optional(),
        state : z.string().optional() ,
        city  : z.string().optional() ,
        neighborhood : z.string().optional() ,
        adres : z.string().optional() ,
        number : z.string().optional()

    })

    const { id } = updateParamsSchema.parse(request.params)

    const { zip_code , state , city , neighborhood , adres , number } = updateBodySchema.parse(request.body)

    try {
        const prismaAdressRepository = new PrismaAdressRepository()
        const updateAdressUseCase = new UpdateAdressUseCase( prismaAdressRepository )
        const user = await updateAdressUseCase.execute({
            id,
            data: {
                zip_code,
                state,
                city,
                neighborhood,
                adres,
                number
            }
        })

        return reply.status(200).send(user)
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message})
        }
        throw err
    }
}