import { User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";

export class GetAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll()
  }
}