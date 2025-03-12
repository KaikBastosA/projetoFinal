import { User } from "@prisma/client";
import { UsersRepository } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


export interface GetAllUsersUseCaseResponse {
    users : User[] 
}

export class GetAllUsersUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.getAll()

    if(!users) throw new ResourceNotFoundError()
    return { users }
  }
}