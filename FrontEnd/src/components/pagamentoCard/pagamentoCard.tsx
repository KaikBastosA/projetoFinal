import { useContext, useState } from 'react';
import Modal from 'react-modal';
import s from './pagamentoCard.module.css'
import { useForm } from 'react-hook-form';
import {Data, DataSchema} from '../../types/dataSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'
import { PaymentSchema } from '../../types/paymentSchema';
import CartContext from '../../context/CartContext';
import { Pajama } from '../../types/Pajama';
import api from '../../api/api';

interface PagamentoCardProps{
    modalPagIsOpen: boolean,
    modalDataIsOpen: boolean
    setPagIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDataIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    dataObj: Data
}

interface Pagamento{
    Cartao: string
}

interface PajamaSale{
    pajamaId: string,
    quantidade: number,
    tamanho: string
}

export default function PagamentoCard({modalDataIsOpen, modalPagIsOpen, setDataIsOpen, setPagIsOpen, dataObj}: PagamentoCardProps) {

    console.log(dataObj)

    var {cart, total} = useContext(CartContext)
    
    if(cart != undefined){
        var pajamaSales: PajamaSale[] = cart.map((item: Pajama) => ({
            pajamaId: item.id,
            quantidade: item.quantidade ?? 0,
            tamanho: item.selectedSize ?? 'P'
        }));
    }
    

    
    console.log(cart)


    var form = useForm({
        resolver: zodResolver(PaymentSchema)
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

    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);

    async function ValidateData(data: Pagamento){
        try{
            var obj = {
                buyer_name: dataObj.Nome,
                cpf: dataObj.CPF, 
                price: total, 
                payment_method: selectedPagamentoOption, 
                installments: selectedParcelamentoOption, 
                card_number: data.Cartao, 
                zip_code: dataObj.CEP, 
                state: dataObj.UF, 
                city: dataObj.Cidade,
                neighborhood: dataObj.Bairro , 
                address: dataObj.Logradouro , 
                number: dataObj.Numero , 
                pajamas: pajamaSales
                 
            }

            await api.post('/create-sale', obj)
            .then((resp) => {
                
                if(resp.status == 201){
                    console.log(resp)
                    closePagModal()
                    setConfirmationModalIsOpen(true);
                    
                }

            })
            .catch((err) => {
                console.log(err)
            })
            
        }catch(err){
            console.log(err)
        }
    }

    function closeConfirmationModal() {
        setConfirmationModalIsOpen(false);
    }


    var pagamento = [
        {value: "cartao", label: 'Cartão de crédito'   },
        {value: "pix", label: 'PIX'   }
    ]

    var parcelamento = [
        {value: 1, label: 'x1'},
        {value: 2, label: 'x2'},
        {value: 3, label: 'x3'},
        {value: 4, label: 'x4'},
        {value: 5, label: 'x5'},
        {value: 6, label: 'x6'},
    ]

    const [selectedPagamentoOption, setSelectedPagamentoOption] = useState()
    const [selectedParcelamentoOption,setSelectedParcelamentoOption] = useState()
    
    

    return (
        <>
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
                    <div className={s.info_div}>
                        <Select placeholder='Forma de pagamento'
                            options={pagamento}
                            className={s.select_pag}
                            onChange={(obj: any) => {setSelectedPagamentoOption(obj?.value)}}                            
                        ></Select>
                        <Select placeholder='Parcelamento x6'
                            options={parcelamento}
                            className={selectedPagamentoOption === "pix"? s.select_par_none : s.select_par}
                            onChange={(obj: any) => {setSelectedParcelamentoOption(obj?.value)}}
                            defaultValue={parcelamento[0].value}
                        ></Select>
                        <div className={s.input_error_div}>
                            <input type="text" placeholder='Número do cartão' className={s.input_cartao} style={selectedPagamentoOption === "pix" ? {display: 'none'} : {}} {...form.register("Cartao")}/>
                            {form.formState.errors.Cartao && selectedPagamentoOption === "cartao" && <span className={s.errorMessage}>{form.formState.errors.Cartao.message}</span>}
                        </div>
                        
                    </div>
                    <div className={s.btns_div}>
                        <button className={s.back_button} onClick={() => {closePagModal(); openDataModal()}}>{'< Voltar'}</button>
                        <button className={s.env_button}>Enviar</button>
                    </div>
                    
                </form>
            </div>
            
            
      </Modal>

      <Modal
            isOpen={confirmationModalIsOpen}
            onRequestClose={closeConfirmationModal}
            contentLabel="Confirmation Modal"
            className={s.modal}
        >
            <div className={s.inputs_main_div}>
                <h2 className={s.title}>Pagamento Confirmado</h2>
                <p className={s.confirmationMessage}>Seu pagamento foi realizado com sucesso!</p>
                <button className={s.env_button} onClick={closeConfirmationModal}>Fechar</button>
            </div>
        </Modal>
        </>

    )


}

