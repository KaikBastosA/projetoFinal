import styles from './styles.module.css';
import logo from '../../assets/logocTitulo.svg';
import Slide from '../../components/slide';

export default function Home() {
    return (
        <>
        <section className={styles.mainBanner}>
            <div className={styles.banner}>
                <img src={logo} alt="" />
                <h1>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</h1>
            </div>
        </section>
            <Slide />
        </>
    )
}