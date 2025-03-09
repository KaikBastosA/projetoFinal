import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "src/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async findByUsername(userName: string) {
        const user = await prisma.user.findUnique({
            where: {
                userName
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}