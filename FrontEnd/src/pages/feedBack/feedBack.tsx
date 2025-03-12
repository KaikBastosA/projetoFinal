import Form from '../../components/form/form'
import s from './feedback.module.css'
import star from '../../assets/Star.svg'
import emptyStar from '../../assets/EmptyStar.svg'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../../api/api';

interface FeedBack {
    nome: string,
    desc: string
}


export default function feedback() {
    
    const { register, handleSubmit } = useForm<FeedBack>();
    const [rating, setRating] = useState(0);
    
    async function onSubmit(data: FeedBack){
        
        await api.post('/feedbacks', {
            name: data.nome,
            description: data.desc,
            rating
        }).then((resp) => {

            console.log(resp.data)
        }

        ).catch((err) => {
            console.log('erro: ', err)
        })

    }


    function handleStarClick(starIndex: number) {
        
        if(starIndex == 1 && rating == 1){
            setRating(0);
        }else{
            setRating(starIndex);
        }
        
        
    }
    
    return (

        <Form>
            <h1 className={s.title}>FeedBack</h1>
            <p className={s.text}>Fale um pouco sobre sua experiência na nossa loja!</p>
            <form className={s.feedback_form} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='Nome completo' {...register("nome")}/>
                <textarea rows={10} className={s.desc} placeholder='Descrição detalhada' {...register("desc")}/>
                <div className={s.star_div}>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                            key={starIndex}
                            className={s[`star${starIndex}`]}
                            src={rating >= starIndex ? star : emptyStar}
                            onClick={() => handleStarClick(starIndex)}                            
                            
                        />
                    ))}
                </div>
                
                <button className={s.enviar_btn}>Enviar</button>
            </form>
        </Form>
    )
}