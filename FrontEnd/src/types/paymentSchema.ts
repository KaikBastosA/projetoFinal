import { z } from "zod";


export const PaymentSchema = z.object({
    Cartao: z.string().nonempty('Campo não pode ser vazio')
})

export type Payment = z.infer<typeof PaymentSchema>