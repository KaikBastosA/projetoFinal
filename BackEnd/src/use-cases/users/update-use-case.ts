import { User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import bcrypt from 'bcryptjs';
import { compare } from "bcryptjs";

interface UpdateUserUseCaseRequest {
    userId: string
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId, data}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
       const user = await this.usersRepository.findById(userId)

       if (!user) {
            throw new ResourceNotFoundError()
       }

       if (data.password) {
            const isSamePassword = await compare(data.password, user.password)
            if (isSamePassword) {
                throw new Error('You cannot use the same password')
            }

            data.password = await bcrypt.hash(data.password, 6)
       }

       const userUpdated = await this.usersRepository.update(userId, data)
       if (!userUpdated) {
            throw new ResourceNotFoundError()
       }

       return { user: userUpdated }
    }
}