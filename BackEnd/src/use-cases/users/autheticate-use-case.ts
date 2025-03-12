import { compare } from 'bcryptjs';
import { User } from "@prisma/client";
import { UsersRepository } from 'src/repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

interface AuthenticateUseCaseRequest {
    email?: string
    username?: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email,username, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        let user = null

        if (email) {
            user = await this.usersRepository.findByEmail(email)
        }

        if (username) {
            user = await this.usersRepository.findByUsername(username)
        }

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}