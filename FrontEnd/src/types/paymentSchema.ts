import { z } from "zod";


export const PaymentSchema = z.object({
    metodoPag: z.string(),
    Cartao: z.string().nonempty('Campo não pode ser vazio').optional()
}).refine((data) => {
    if (data.metodoPag === "cartao") {
      return data.Cartao; 
    }
    return true; 
  }, {
    message: "Número do cartão é obrigatório para a opção de cartão",
  });

export type Payment = z.infer<typeof PaymentSchema>