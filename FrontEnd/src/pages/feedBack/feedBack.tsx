import Form from '../../components/form/form'
import s from './feedback.module.css'
import star from '../../assets/WhiteStar.svg'
import emptyStar from '../../assets/EmptyWhiteStar.svg'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../../api/api';
import Modal from 'react-modal'
import { zodResolver } from '@hookform/resolvers/zod';
import { FeedbackSchema, Feedback } from '../../types/feedbackSchema';


export default function feedback() {
    
    var form = useForm({
        resolver: zodResolver(FeedbackSchema)
    })
    const [rating, setRating] = useState(0);
    
    async function onSubmit(data: Feedback){
        
        await api.post('/feedbacks', {
            name: data.nome,
            description: data.desc,
            rating
        }).then((resp) => {
            setOpen(true)
            
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

    const [open, setOpen] = useState(false)

    function closeModal(){
        setOpen(false)
    }
    
    return (
        <>
            <Form>
                <h1 className={s.title}>FeedBack</h1>
                <p className={s.text}>Fale um pouco sobre sua experiência na nossa loja!</p>
                <form className={s.feedback_form} onSubmit={form.handleSubmit(onSubmit)}>
                    <input className={s.input} type="text" placeholder='Nome completo' {...form.register("nome")}/>
                    {form.formState.errors.nome && <span className={s.errorMessage}>{form.formState.errors.nome.message}</span>}
                    <textarea rows={10} className={s.desc} placeholder='Descrição detalhada' {...form.register("desc")}/>
                    {form.formState.errors.desc && <span className={s.errorMessage}>{form.formState.errors.desc.message}</span>}
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
            <Modal isOpen={open} onRequestClose={closeModal} className={s.modalContent}>
                    <div>
                        <h1>FeedBack criado com sucesso!!</h1>
                    </div>
            </Modal>
        </>

    )
}