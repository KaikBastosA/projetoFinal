import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/form/form'
import s from './login.module.css'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const userSchema = z.object({
    EmailOuUsuario: z.string().nonempty('O e-mail ou Usuário não pode ser vazio').refine((value) => {
        const emailSchema = z.string().email();
        const usernameSchema = z.string().regex(/^[a-zA-Z0-9_ ]+$/)
        return  emailSchema.safeParse(value).success|| usernameSchema.safeParse(value).success;
    },
    {
        message: "O usuário não deve conter espaços ou acentos e o e-mail deve ser válido"
    }
),
    Senha: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

type User = z.infer<typeof userSchema>

export default function login() {

    var nav = useNavigate()

    var form = useForm({
        resolver: zodResolver(userSchema)
    })

    async function Validate(data: User) {
        try{
            form.reset()
            

            console.log('ALALALALA')
            // nav('/')
        }catch{
            
            form.setError('root', {
                type: 'server',
                message: 'Erro ao fazer login'
            })
        }
        


    }


    return (

        <Form>
            <h1 className={s.title}>Login</h1>
            <p className={s.text}>Faça login para ter acesso aos pijamas dos seus <strong>sonhos!</strong></p>
            <form onSubmit={form.handleSubmit(Validate)} action="" className={s.login_form}>
                <input className={s.input_log} type="text" placeholder='Usuário ou e-mail'  {...form.register("EmailOuUsuario")}/>
                {form.formState.errors.EmailOuUsuario && <span className={s.errorMessage}>{form.formState.errors.EmailOuUsuario.message}</span>}
                <input className={s.input_log} type="text" placeholder='Senha'  {...form.register("Senha")}/>
                <Link className={s.senha_btn} to=''>Esqueci minha senha</Link>
                {form.formState.errors.Senha && <span className={s.errorMessage}>{form.formState.errors.Senha.message}</span>}
                <button className={s.entrar_btn}>Entrar</button>
                {form.formState.errors.root && <span className={s.errorMessage}>{form.formState.errors.root.message}</span>}
            </form>
            <hr className={s.separator} />
            <button className={s.cadastrar_btn}><Link className={s.cadastrar_link} to='/reg/cadastro'>Cadastre-se</Link></button>
        </Form>
    )
}