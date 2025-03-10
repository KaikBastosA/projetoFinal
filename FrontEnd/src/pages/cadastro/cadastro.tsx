import Form from '../../components/form/form'
import s from './cadastro.module.css'


export default function cadastro() {

    return (
        <Form>
            <h1 className={s.title}>Registre-se</h1>
            <form action="" className={s.form}>
                <input type="text" placeholder="Nome" />
                <input type="text" placeholder="Nome de Usuário" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Senha" />
                <input type="text" placeholder='Confirmar senha'/>
                <button className={s.reg_btn}>Registrar</button>
            </form>
        </Form>
        
                
            
    
    )
}