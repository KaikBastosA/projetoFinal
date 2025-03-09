import { UsersRepository } from "src/repositories/users-repository";
import bcrypt from 'bcryptjs';
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { UsernameAlreadyExistsError } from "../errors/username-already-exists-error";

interface RegisterUseCaseRequest {
    name: string
    userName: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(data: RegisterUseCaseRequest) {
        const userNameAlreadyExists = await this.usersRepository.findByUsername(data.userName)

        if (userNameAlreadyExists) {
            throw new UsernameAlreadyExistsError()
        }

        const emailAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (emailAlreadyExists) {
            throw new EmailAlreadyExistsError()
        }

        const password_hash = await bcrypt.hash(data.password, 6)

        await this.usersRepository.create({
            name: data.name,
            userName: data.userName,
            email: data.email,
            password: password_hash
        })
    }
}