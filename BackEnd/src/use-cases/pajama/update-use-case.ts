import { Pajama, User } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "src/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import bcrypt from 'bcryptjs';
import { compare } from "bcryptjs";
import { PajamaRepository, UpdatePajamaInput } from "src/repositories/pajama-repository";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";

interface UpdatePajamaRequest {
    id: string
    data: UpdatePajamaInput
}

interface UpdatePajamaResponse {
    pajama : Pajama
}

export class UpdaPajamaCase {
    constructor(private pajamaRepository : PrismaPajamaRepository ) {}

    async execute({ id , data}: UpdatePajamaRequest  ): Promise<UpdatePajamaResponse> {
       const pajama = await this.pajamaRepository.getById(id)

        if( !pajama ) throw new ResourceNotFoundError()

       const pajamaUpdated = await this.pajamaRepository.update(id , data )
       if (!pajamaUpdated) {
            throw new ResourceNotFoundError()
       }

       return { pajama : pajamaUpdated  }
    }
}