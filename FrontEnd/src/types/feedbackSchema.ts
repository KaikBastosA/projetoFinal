import { z } from "zod";


export const FeedbackSchema = z.object({
    nome: z.string().nonempty('Campos não podem ser vazios'),
    desc: z.string().nonempty('Campos não podem ser vazios')
})

export type Feedback = z.infer<typeof FeedbackSchema>