import { FeedBack, Pajama } from "@prisma/client";
import { FeedbacksRepository } from "src/repositories/feedbacks-repository";
import { PrismaPajamaRepository } from "src/repositories/prisma/prisma-pajama-repository";

interface CreatePajamaUseCaseRequest {
    name: string,
    description: string
    image: string,
    price: number,
    season: string,
    type: string,
    gender: string,
    favorite: boolean,
    on_sale: boolean
    sale_percent ?: number

}
interface CreatePajamaResponse {
    pajama : Pajama | null
}

export class CreatePajmaUseCase {
    constructor(private  pajamaRepository : PrismaPajamaRepository ) {}

    async execute({ name, description, image, price, season, type, gender, favorite, on_sale, sale_percent }: CreatePajamaUseCaseRequest ) : Promise<CreatePajamaResponse> {
        
        const  pajama = await this.pajamaRepository.create({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            on_sale,
            sale_percent
        })

        return { pajama }

    }
}