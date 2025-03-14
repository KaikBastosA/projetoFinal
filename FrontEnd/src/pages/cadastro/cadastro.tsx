import Form from '../../components/form/form'
import s from './cadastro.module.css'
import { UserCreate, userCreateSchema } from '../../types/UserCreateSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../api/api'
import Modal from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function cadastro() {
    const navigate = useNavigate();
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
                form.reset()
                console.log('Usuario criado com sucesso')
                form.clearErrors()
                setOpen(true)

                setTimeout(() => {
                    navigate('/');
                }, 3000)
                
            })
            .catch((err) => {
                form.setError('root', {
                    type: 'server',
                    message: `Erro ao fazer login: ${err.response.data.message}` 
                })
            })
        }catch{
            console.log('Erro')
        }
    }

    const [open, setOpen] = useState(false)

    function closeModal(){
        setOpen(false)
    }

    return (
        <>
        <Form>
            <h1 className={s.title}>Registre-se</h1>
            <form action="" className={s.form} onSubmit={form.handleSubmit(CreateUser)}>
                <input className={s.input} type="text" placeholder="Nome" {...form.register("Nome")}/>
                {form.formState.errors.Nome && <span className={s.errorMessage}>{form.formState.errors.Nome.message}</span>}
                <input className={s.input} type="text" placeholder="Nome de Usuário" {...form.register("Usuario")}/>
                {form.formState.errors.Usuario && <span className={s.errorMessage}>{form.formState.errors.Usuario.message}</span>}
                <input className={s.input} type="text" placeholder="Email" {...form.register("Email")}/>
                {form.formState.errors.Email && <span className={s.errorMessage}>{form.formState.errors.Email.message}</span>}
                <input className={s.input} type="text" placeholder="Senha" {...form.register("Senha")}/>
                {form.formState.errors.Senha && <span className={s.errorMessage}>{form.formState.errors.Senha.message}</span>}
                <input className={s.input} type="text" placeholder='Confirmar senha' {...form.register("ConfirmaSenha")}/>
                {form.formState.errors.ConfirmaSenha && <span className={s.errorMessage}>{form.formState.errors.ConfirmaSenha.message}</span>}
                <button className={s.reg_btn}>Registrar</button>
                {form.formState.errors.root && <span className={s.errorMessage}>{form.formState.errors.root.message}</span>}
            </form>
        </Form>
        <Modal isOpen={open} onRequestClose={closeModal} className={s.modalContent}>
            <div>
                <h1>Usuário criado com sucesso!!</h1>
                <p>Você será redirecionado para a página inicial em 3 segundos...</p>
            </div>
        </Modal>
        </>
    )
}