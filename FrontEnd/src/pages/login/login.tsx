import { Link } from 'react-router-dom'
import Form from '../../components/form/form'
import s from './login.module.css'


export default function login() {

    return (

        <Form>
            <h1 className={s.title}>Login</h1>
            <p className={s.text}>Faça login para ter acesso aos pijamas dos seus <strong>sonhos!</strong></p>
            <form action="" className={s.login_form}>
                <input className={s.input_log} type="text" placeholder='Usuário ou e-mail'/>
                <input className={s.input_log} type="text" placeholder='Senha' />
                <Link className={s.senha_btn} to=''>Esqueci minha senha</Link>
                <button className={s.entrar_btn}>Entrar</button>
            </form>
            <hr className={s.separator} />
            <button className={s.cadastrar_btn}><Link className={s.cadastrar_link} to='/reg/cadastro'>Cadastre-se</Link></button>
        </Form>
    )
}