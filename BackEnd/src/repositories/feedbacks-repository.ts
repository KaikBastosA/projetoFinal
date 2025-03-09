import { FeedBack, Prisma } from "@prisma/client";

export interface  FeedbacksRepository {
    create(data: Prisma.FeedBackCreateInput): Promise<FeedBack>
    delete(id: string): Promise<FeedBack | null>
    findById(id: string): Promise<FeedBack | null>
}