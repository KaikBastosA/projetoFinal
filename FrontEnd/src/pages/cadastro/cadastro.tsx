import Form from '../../components/form/form'
import s from './cadastro.module.css'
import { UserCreate, userCreateSchema } from '../../types/UserCreateSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../api/api'

export default function cadastro() {

    var form = useForm({
        resolver: zodResolver(userCreateSchema)
    })

    async function CreateUser(data: UserCreate) {
        try{
            
            await api.post('/users', {
                name: data.Nome,
                username: data.Usuario,
                email: data.Email,
                password: data.Senha
            })
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err)
            })

            console.log('Usuario criado com sucesso')
            
        }catch{
            
            form.setError('root', {
                type: 'server',
                message: 'Erro ao fazer login'
            })
        }
        


    }



    return (
        <Form>
            <h1 className={s.title}>Registre-se</h1>
            <form action="" className={s.form} onSubmit={form.handleSubmit(CreateUser)}>
                <input type="text" placeholder="Nome" {...form.register("Nome")}/>
                {form.formState.errors.Nome && <span className={s.errorMessage}>{form.formState.errors.Nome.message}</span>}
                <input type="text" placeholder="Nome de Usuário" {...form.register("Usuario")}/>
                {form.formState.errors.Usuario && <span className={s.errorMessage}>{form.formState.errors.Usuario.message}</span>}
                <input type="text" placeholder="Email" {...form.register("Email")}/>
                {form.formState.errors.Email && <span className={s.errorMessage}>{form.formState.errors.Email.message}</span>}
                <input type="text" placeholder="Senha" {...form.register("Senha")}/>
                {form.formState.errors.Senha && <span className={s.errorMessage}>{form.formState.errors.Senha.message}</span>}
                <input type="text" placeholder='Confirmar senha' {...form.register("ConfirmaSenha")}/>
                {form.formState.errors.ConfirmaSenha && <span className={s.errorMessage}>{form.formState.errors.ConfirmaSenha.message}</span>}
                <button className={s.reg_btn}>Registrar</button>
            </form>
        </Form>
        
                
            
    
    )
}