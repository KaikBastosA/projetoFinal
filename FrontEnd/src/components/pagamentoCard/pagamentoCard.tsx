import { useState } from 'react';
import Modal from 'react-modal';
import s from './pagamentoCard.module.css'
import { useForm } from 'react-hook-form';
import {Data, DataSchema} from '../../types/dataSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'

interface PagamentoCardProps{
    modalPagIsOpen: boolean,
    modalDataIsOpen: boolean
    setPagIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDataIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    dataObj: Data
}

export default function PagamentoCard({modalDataIsOpen, modalPagIsOpen, setDataIsOpen, setPagIsOpen, dataObj}: PagamentoCardProps) {

    console.log(dataObj)


    var form = useForm({
        resolver: zodResolver(DataSchema)
    })

    function openPagModal() {
        setPagIsOpen(true);
    }

    function openDataModal() {
        setDataIsOpen(true);
    }

    function afterPagOpenModal() {
        
    }

    function closePagModal() {
        setPagIsOpen(false);
    }

    function closeDataModal() {
        setDataIsOpen(false);
    }

    async function ValidateData(data: Data){
        try{
            
            
        }catch(err){
            console.log(err)
        }
    }


    return (
        <Modal
        isOpen={modalPagIsOpen}
        onAfterOpen={afterPagOpenModal}
        onRequestClose={closePagModal}
        contentLabel="Example Modal"
        className={s.modal}
      >
            
            <div className={s.inputs_main_div}>
                <form className={s.dados_form} onSubmit={form.handleSubmit(ValidateData)}>
                    <h2 className={s.title}>Pagamento</h2>
                    <div>
                        <Select placeholder='Forma de pagamento'></Select>
                        <Select placeholder='Parcelamento'></Select>
                        <Select placeholder='Forma de pagamento'></Select>
                    </div>
                    <div>
                        <button className={s.back_button} onClick={() => {closePagModal(); openDataModal()}}>Voltar</button>
                        <button className={s.env_button}>Enviar</button>
                    </div>
                    
                </form>
            </div>
            
            
      </Modal>

    )


}