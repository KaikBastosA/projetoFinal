import { z } from "zod";

export const userCreateSchema = z.object({
    Nome: z.string().nonempty('O Nome não pode ser vazio'),
    
    Email: z.string().nonempty('O Email não pode ser vazio').email('O email deve ser válido'),
    
    Usuario: z.string().nonempty('O Usuario não pode ser vazio').regex(/^[a-zA-Z0-9_]+$/, 'O usuário não deve conter acentos ou espaços'),
    
    Senha: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres').regex(/[^\s]/, 'A senha não pode conter espaços'),
    
    ConfirmaSenha: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres').regex(/[^\s]/, 'A senha não pode conter espaços')
}).refine((value) => {
    return value.Senha == value.ConfirmaSenha
}, {
    message: "Senhas não batem",
    path: ["confirm"],
})

export type UserCreate = z.infer<typeof userCreateSchema>




