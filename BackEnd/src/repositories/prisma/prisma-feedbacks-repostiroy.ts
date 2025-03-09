import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaFeedbacksRepository {
    async create(data: Prisma.FeedBackCreateInput){
        const feedback = await prisma.feedBack.create({
            data
        })
        
        return feedback;
    }
}