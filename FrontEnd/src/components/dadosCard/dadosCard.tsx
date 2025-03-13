import { useState } from 'react';
import Modal from 'react-modal';
import s from './dadosCard.module.css'
import { useForm } from 'react-hook-form';
import {Data, DataSchema} from '../../types/dataSchema'
import { zodResolver } from '@hookform/resolvers/zod';

interface DadosCradProps{
    modalIsOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export default function DadosCard({modalIsOpen, setIsOpen}: DadosCradProps) {

    var form = useForm({
        resolver: zodResolver(DataSchema)
    })

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        
    }

    function closeModal() {
        setIsOpen(false);
    }

    function ValidateData(data: Data){
        try{
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={s.modal}
      >
            
            <div className={s.inputs_main_div}>
                <form className={s.dados_form} onSubmit={form.handleSubmit(ValidateData)}>
                    <h2 className={s.title}>Dados</h2>
                    <input className={s.input} type="text" placeholder='Nome Completo' {...form.register("Nome")}/>
                    {form.formState.errors.Nome && <span className={s.errorMessage}>{form.formState.errors.Nome.message}</span>}

                    <input className={s.input} type="text" placeholder='CPF' {...form.register("CPF")}/>
                    {form.formState.errors.CPF && <span className={s.errorMessage}>{form.formState.errors.CPF.message}</span>}
                    
                    <input className={s.input} type="text" placeholder='CEP' {...form.register("CEP")}/>
                    {form.formState.errors.CEP && <span className={s.errorMessage}>{form.formState.errors.CEP.message}</span>}
                    
                    <input className={s.input} type="text" placeholder='Logradouro' {...form.register("Logradouro")}/>
                    {form.formState.errors.Logradouro && <span className={s.errorMessage}>{form.formState.errors.Logradouro.message}</span>}
                    
                    <div className={s.inputs_sub_div}>
                        <div>
                            <input className={s.min_input} type="text" placeholder='UF' {...form.register("UF")}/>
                            {form.formState.errors.UF && <span className={s.errorMessage}>{form.formState.errors.UF.message}</span>}
                            
                            <input className={s.med_input} type="text" placeholder='Cidade' {...form.register("Cidade")}/>
                            {form.formState.errors.Cidade && <span className={s.errorMessage}>{form.formState.errors.Cidade.message}</span>}
                        </div>
                        <div>
                            <input className={s.min_input} type="text" placeholder='Número' {...form.register("Numero")}/>
                            {form.formState.errors.Numero && <span className={s.errorMessage}>{form.formState.errors.Numero.message}</span>}
                            
                            <input className={s.med_input} type="text" placeholder='Bairro' {...form.register("Bairro")}/>
                            {form.formState.errors.Bairro && <span className={s.errorMessage}>{form.formState.errors.Bairro.message}</span>}
                        </div>
                    </div>
                    <button className={s.env_button}>Enviar</button>
                </form>
            </div>
            
            
      </Modal>

    )


}