import styles from './styles.module.css'
import PijamaIndividualCard from '../../components/pijamaIndividualCard'
import inverno from '../../assets/inverno.svg'
import verao from '../../assets/verao.svg'
import masculino from '../../assets/masculino.svg'
import feminino from '../../assets/feminino.svg'
import familia from '../../assets/familia.svg'
import unissex from '../../assets/unissex.svg'
import infantil from '../../assets/infantil.svg'
import adulto from '../../assets/adulto.svg'
import ambos from '../../assets/ambos.svg'
import { Pajama } from '../../types/Pajama'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../api/api'

type Genero = 'Feminino' | 'Masculino' | 'Família' | 'Unissex';
type Tipo = 'Adulto' | 'Infantil' | 'Ambos';
type Estacao = 'Verão' | 'Inverno';

const icones: {
    genero: Record<Genero, string>;
    tipo: Record<Tipo, string>;
    estacao: Record<Estacao, string>;
} = {
    genero: {
        Feminino: feminino,
        Masculino: masculino,
        Família: familia,
        Unissex: unissex
    },
    tipo: {
        Adulto: adulto,
        Infantil: infantil,
        Ambos: ambos
    },
    estacao: {
        Verão: verao,
        Inverno: inverno
    }
}


export default function pijamaIndividual() {

    const { id } = useParams(); 
    const [pijama, setPijama] = useState<Pajama | null>(null);

    useEffect(() => {
        api.get(`/pajamas/${id}`)
            .then(response => {
                setPijama(response.data);
            })
            .catch(error => console.error("Erro ao buscar pijama:", error));
    }, [id]);

    if (!pijama) return <p>Carregando...</p>;

    return(
        <div className={styles.individual}>

            <div className={styles.buyContainer}>
                <PijamaIndividualCard id={pijama.id} name={pijama.name} image={pijama.image} price={pijama.price} size={pijama.size}/>
            </div>

            <div className={styles.caracteristicasContainer}>
                <img src={icones.estacao[pijama.season as Estacao]} alt={`ícone ${pijama.season}`} />
                <img src={icones.genero[pijama.gender as Genero]} alt={`ícone ${pijama.gender}`} />
                <img src={icones.tipo[pijama.type as Tipo]} alt={`ícone ${pijama.type}`} />
            </div>

            <div className={styles.sobreContainer}>
                <h1>SOBRE NOSSO PIJAMA</h1>
                <p>{pijama.description}</p>
                <h4>Contém:</h4>
                <ul>
                    <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li>
                    <li>Uma calça na cor azul petróleo com estampa poá branca</li>
                </ul>
                <h4>Composição:</h4>
                <ul>
                    <li>100% algodão</li>
                </ul>
            </div>
        </div>
    )
}