import { Link, useNavigate } from 'react-router-dom'
import Form from '../../components/form/form'
import s from './login.module.css'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import api from '../../api/api'
import { UserLogin, userLoginSchema } from '../../types/UserLoginSchema'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    var nav = useNavigate()

    var form = useForm({
        resolver: zodResolver(userLoginSchema)
    })

    async function ValidateUser(data: UserLogin) {
        
        
        try{
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var obj;
            
            if(emailRegex.test(data.EmailOuUsuario)){
                obj = {
                    email : data.EmailOuUsuario,
                    password : data.Senha
                }
            }else{
               obj =  {
                    username: data.EmailOuUsuario,
                    password: data.Senha
                }
            }


            await api.post('/authenticate', obj)
            .then((resp) => {
                console.log(resp.data)

                if(resp.status == 200){
                    nav('/')
                }
                
                
            }).catch((err) => {
                if(err.response.status == 401){
                    setErrorMessage('Usuário ou senha inválidos')
                }
            })
            
        }catch{
            
            form.setError('root', {
                type: 'server',
                message: 'Erro de servidor ao fazer login'
            })
        }
        

    }



    return (

        <Form>
            <h1 className={s.title}>Login</h1>
            <p className={s.text}>Faça login para ter acesso aos pijamas dos seus <strong>sonhos!</strong></p>

            <form onSubmit={form.handleSubmit(ValidateUser)} action="" className={s.login_form}>

                <input className={s.input_log} type="text" placeholder='Usuário ou e-mail'  {...form.register("EmailOuUsuario")}/>

                {form.formState.errors.EmailOuUsuario && <span className={s.errorMessage}>{form.formState.errors.EmailOuUsuario.message}</span>}

                <div className={s.passwordContainer}>
                    <input className={s.input_log} type={showPassword ? 'text' : 'password'} placeholder='Senha'  {...form.register("Senha")}/>
                    <button type="button" className={s.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>

                <Link className={s.senha_btn} to=''>Esqueci minha senha</Link>

                {form.formState.errors.Senha && <span className={s.errorMessage}>{form.formState.errors.Senha.message}</span>}

                <button className={form.formState.isSubmitting ? s.entrar_btn_dis : s.entrar_btn} disabled={form.formState.isSubmitting} >{form.formState.isSubmitting ? 'Entrando..' : 'Entrar'}</button>

                {form.formState.errors.root && <span className={s.errorMessage}>{form.formState.errors.root.message}</span>}

                {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
            </form>

            <hr className={s.separator} />
            <button disabled={form.formState.isSubmitting} className={form.formState.isSubmitting? s.cadastrar_btn_dis : s.cadastrar_btn}><Link className={s.cadastrar_link} to='/reg/cadastro'>Cadastre-se</Link></button>
        </Form>
    )
}