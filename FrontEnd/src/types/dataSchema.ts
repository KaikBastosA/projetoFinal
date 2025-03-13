import { z } from "zod";
import isValidCPF from "../validators/cpfValidator"
import isValidCEP from "../validators/cepValidator";


export const DataSchema = z.object({
    Nome: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {return !/[0-9]/.test(value)}, 'Nome não pode conter números'),
    CPF: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => { return isValidCPF(value)}, 'CPF Inválido'),
    CEP: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => { return isValidCEP(value)}, 'CEP Inválido'),
    Logradouro: z.string().nonempty('Campo deve ser preenchido'),
    UF: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {return !/[0-9]/.test(value)}, 'UF não pode conter números'),
    Cidade: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {return !/[0-9]/.test(value)}, 'Cidade não pode conter números'),
    Numero: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {return /[0-9]/.test(value)}, 'Número deve conter apenas números'),
    Bairro: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {return !/[0-9]/.test(value)}, 'Bairro não pode conter números')
})

export type Data = z.infer<typeof DataSchema>