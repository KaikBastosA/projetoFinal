import { z } from "zod";

function isValidCPF(cpf: any) {
    // Se não for string, o CPF é inválido
    if (typeof cpf !== 'string') return false
    
    // Remove todos os caracteres que não sejam números
    cpf = cpf.replace(/[^\d]+/g, '')
    
    // Se o CPF não tem 11 dígitos ou todos os dígitos são repetidos, o CPF é inválido
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    
    // Transforma de string para number[] com cada dígito sendo um número no array
    cpf = cpf.split('').map((el: number) => +el)
    
    // Cria uma função interna que calcula o dígito verificador do CPF atual:
    const rest = (count: number) =>
        // Pega os primeiros count dígitos
        (cpf.slice(0, count-12)
          // e calcula o dígito verificador de acordo com a fórmula da Receita Federal
          .reduce( (soma: number, el: number, index: number) => (soma + el * (count-index)), 0 ) * 10 ) % 11 % 10
          
    // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
    return rest(10) === cpf[9] && rest(11) === cpf[10]
}

async function isValidCEP(cep: string){
    console.log('oiii')
    await fetch(`viacep.com.br/ws/${cep}/json/`, {
        method: 'GET'
    }).then((resp) => {
        if(resp.status == 200){
            console.log(resp)
            return true
        }else{
            return false
        }

    }).catch(() => {
        return false
    })

}

export const DataSchema = z.object({
    Nome: z.string().nonempty('Campo deve ser preenchido'),
    CPF: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => { return isValidCPF(value)}, 'CPF Inválido'),
    CEP: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => { return isValidCEP(value)} , 'CEP Inválido'),
    Logradouro: z.string().nonempty('Campo deve ser preenchido'),
    UF: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {!/\d/.test(value)}, 'UF não pode conter números'),
    Cidade: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {!/\d/.test(value)}, 'Cidade não pode conter números'),
    Numero: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {/^\d+$/.test(value)}, 'Número deve conter apenas números'),
    Bairro: z.string().nonempty('Campo deve ser preenchido').refine((value: string) => {!/\d/.test(value)}, 'Bairro não pode conter números')
})

export type Data = z.infer<typeof DataSchema>