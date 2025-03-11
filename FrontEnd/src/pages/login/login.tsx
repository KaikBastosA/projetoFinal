import { Link } from 'react-router-dom'
import Form from '../../components/form/form'
import s from './login.module.css'


export default function login() {

    return (

        <Form>
            <h1>Login</h1>
            <p>Faça login para ter acesso aos pijamas dos seus sonhos!</p>
            <form action="">
                <input type="text" placeholder='Usuário ou e-mail'/>
                <input type="text" placeholder='Senha' />
                <button>Entrar</button>
            </form>
            <Link to='reg/cadastro'>Cadastre-se</Link>
        </Form>
    )
}