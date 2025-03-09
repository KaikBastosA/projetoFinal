import { FeedBack, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaFeedbacksRepository {
    async create(data: Prisma.FeedBackCreateInput){
        const feedback = await prisma.feedBack.create({
            data
        })
        
        return feedback;
    }
    async delete(id: string){
        const feedback = await prisma.feedBack.delete({
            where: {
                id
            }
        })
        
        return feedback;
    }
    async findById(id: string){
        const feedback = await prisma.feedBack.findUnique({
            where: {
                id
            }
        })
        return feedback 
    }
    async findAll(): Promise<FeedBack[]> {
        const feedbacks = await prisma.feedBack.findMany()
        return feedbacks
    }
}