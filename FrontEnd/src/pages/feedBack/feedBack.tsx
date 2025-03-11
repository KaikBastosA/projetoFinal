import Form from '../../components/form/form'
import s from './feedback.module.css'
import star from '../../assets/Star.svg'
import emptyStar from '../../assets/EmptyStar.svg'

export default function feedback() {

    return (

        <Form>
            <h1 className={s.title}>FeedBack</h1>
            <p className={s.text}>Fale um pouco sobre sua experiência na nossa loja!</p>
            <form className={s.feedback_form}>
                <input type="text" placeholder='Nome completo' />
                <textarea rows={10} className={s.desc} placeholder='Descrição detalhada' />
                <div className={s.star_div}>
                    <img className={s.star}src={emptyStar} alt="" />
                    <img className={s.star}src={emptyStar} alt="" />
                    <img className={s.star}src={emptyStar} alt="" />
                    <img className={s.star}src={emptyStar} alt="" />
                    <img className={s.star}src={emptyStar} alt="" />
                </div>
                
                <button className={s.enviar_btn}>Enviar</button>
            </form>
        </Form>
    )
}