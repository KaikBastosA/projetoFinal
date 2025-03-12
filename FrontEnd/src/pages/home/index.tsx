import styles from './styles.module.css';
import logo from '../../assets/logocTitulo-blue.svg';
import Slide from '../../components/slide';
import people from '../../assets/people-icon.svg';
import pijama from '../../assets/pijama-icon.svg';
import truck from '../../assets/truck-icon.svg';
import FeedbackSlider from '../../components/feedBackSlide';

export default function Home() {
    return (
        <>
            <section className={styles.mainBanner}>
                <div className={styles.banner}>
                    <img src={logo} alt="" />
                    <h1>Se os lobos soubessem desse conforto, nem sopravam casas, iam dormir!</h1>
                </div>
            </section>
            <section className='Slide'>
                <Slide />
            </section>
            <section className={styles.mainSiteContent}>
                <section className={styles.positives}>
                    <div className={styles.positivesContent}>
                        <img src={pijama} alt="" />
                        <h2>Pijamas confortáveis e com tecnologia</h2>
                    </div>
                    <div className={styles.positivesContent}>
                        <img src={people} alt="" />
                        <h2>Modelos para todas as idades e tamanhos</h2>
                    </div>
                    <div className={styles.positivesContent}>
                        <img src={truck} alt="" />
                        <h2>Frete grátis em todo o Brasil e exterior</h2>
                    </div>
                </section>
                <section className={styles.promos}>
                    <h2>Nossas últimas promoções!</h2>
                </section>
                <section className={styles.feedbacks}>
                    <h2>Feedbacks</h2>
                    <FeedbackSlider />
                </section>
            </section>
        </>
    )
}