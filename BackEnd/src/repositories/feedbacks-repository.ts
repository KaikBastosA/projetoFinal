import { FeedBack, Prisma } from "@prisma/client";

export interface  FeedbacksRepository {
    create(data: Prisma.FeedBackCreateInput): Promise<FeedBack>; 
}