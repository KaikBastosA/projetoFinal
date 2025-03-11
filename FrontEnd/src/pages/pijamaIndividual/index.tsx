import styles from './styles.module.css'
import PijamaIndividualCard from '../../components/pijamaIndividualCard'
import inverno from '../../assets/inverno.svg'
import unissex from '../../assets/unissex.svg'
import adulto from '../../assets/adulto.svg'

export default function pijamaIndividual() {
    return(
        <div className={styles.individual}>

            <div className={styles.buyContainer}>
                <PijamaIndividualCard/>
            </div>

            <div className={styles.caracteristicasContainer}>
                <img src={inverno} alt="pijama" />
                <img src={unissex} alt="pijama" />
                <img src={adulto} alt="pijama" />
            </div>

            <div className={styles.sobreContainer}>
                <h1>SOBRE NOSSO PIJAMA</h1>
                <p>Esse pijama é perfeito para as noites mais frias do inverno, isso graças ao seu tecido que é de alta qualidade, feito com o mais puro algodão da Suécia. Além disso, sua cor sofisticada traz a sensação de fineza e conforto, o que reflete a alta costura da peça.</p>
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