import { useParams } from "react-router-dom"
import s from './pijamas.module.css'
import Select from 'react-select'
import { useEffect } from "react";

export default function Pijamas() {

    var genero = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Unissex', label: 'Unissex' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Família', label: 'Família' }
    ];

    var tipo = [
        { value: 'Todos', label: 'Todos' },
        { value: 'Adulto', label: 'Adulto' },
        { value: 'Infantil', label: 'Infantil' }
    ]

    var estacao =[
        {value: 'Todos', label: 'Todos'},
        {value: 'Verao', label: 'Verao'},
        {value: 'Inverno', label: 'Inverno'}
    ]

    
    var typeParam = useParams().type

    useEffect(() => {
        
    }, [])
    
    return (
        <div>
            <div className={s.filter_div}>
                <div className={s.input_div}>
                    <input type="text" name="" id="" placeholder="Pesquise pelo prduto"/>
                    <button></button>
                </div>
            </div>
            <div>
                
                <Select placeholder='Gênero' className={s.dropdown_menu} options={genero} isDisabled={typeParam === 'Masculino' || typeParam === 'Feminino'}></Select>
                <Select placeholder="Tipo" className={s.dropdown_menu} options={tipo} isDisabled={typeParam === 'Infantil'}></Select>
                <Select placeholder='Estação' className={s.dropdown_menu} options={estacao}></Select>
            </div>
        </div>
    )
}