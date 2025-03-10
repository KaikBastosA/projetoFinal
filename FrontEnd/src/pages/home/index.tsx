import styles from './styles.module.css';
import logo from '../../assets/logocTitulo.svg';

export default function Home() {
    return (
        <>
            <section className={styles.main}>
                <img src={logo} alt="Pijam{IN}ha-logo" />
                <h1>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</h1>
            </section>
        </>
    )
}