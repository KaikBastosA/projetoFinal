import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "src/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany()

        return users
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        })

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async delete(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })

        return user
    }

    async findByUsername(username: string) {
        const user = await prisma.user.findUnique({
            where: {
                username
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