import { useParams } from "react-router-dom"
import s from './pijamas.module.css'
import Select from 'react-select'
import { useEffect, useState } from "react";
import Lupa from '../../assets/Lupa.svg'

export default function Pijamas() {

    var styles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: '#97C3D8',
            border: 'none',
            boxShadow: '0px 4px 4px 0 #00000040',
            paddingLeft: '20px'
        }),
        placeholder: (baseStyles: any) => ({
            ...baseStyles,
            color: 'black',
            fontWeight: 500,
            fontSize: '20px',
            
        }),
        singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: 'black',
            fontWeight: 500,
            fontSize: '20px',
            
        }),
        dropdownIndicator: (baseStyles: any) => ({
            ...baseStyles,
            color: '#274553',
        })
      }


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

    const [selectedGeneroOption, setSelectedGeneroOption] = useState<string>('Todos');
    const [selectedTipoOption, setSelectedTipoOption] = useState<string>('Todos');
    const [selectedEstacaoOption, setSelectedEstacaoOption] = useState<string>('Todos');
    var typeParam = useParams().type

    useEffect(() => {
        
    }, [])

    console.log(selectedGeneroOption)
    console.log(selectedTipoOption)
    console.log(selectedEstacaoOption)
    
    return (
        <div className={s.main_div}>

            <div className={s.filter_div}>
                <div className={s.input_div}>
                    <input className={s.input} type="text" name="" id="" placeholder="Pesquise pelo produto"/>
                    <button className={s.input_btn}><img src={Lupa}></img></button>
                </div>
                <div className={s.dropdown_div}>
                    <Select 
                        onChange={(obj: any) => {setSelectedGeneroOption(obj?.value)}} 
                        placeholder='Gênero' 
                        className={s.dropdown_menu} 
                        options={genero} 
                        isDisabled={typeParam === 'Masculino' || typeParam === 'Feminino'}
                        styles={styles}
                    ></Select>
                    <Select 
                        onChange={(obj: any) => {setSelectedTipoOption(obj?.value)}}
                        placeholder="Tipo" 
                        className={s.dropdown_menu} 
                        options={tipo} 
                        isDisabled={typeParam === 'Infantil'}
                        styles={styles}
                    ></Select>
                    <Select 
                        onChange={(obj: any) => {setSelectedEstacaoOption(obj?.value)}}
                        placeholder='Estação' 
                        className={s.dropdown_menu} 
                        options={estacao}
                        styles={styles}
                    ></Select>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}