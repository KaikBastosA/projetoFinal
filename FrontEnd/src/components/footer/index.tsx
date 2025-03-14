import styles from './styles.module.css';
import instagram from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import linkedin from '../../assets/linkedin.svg';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <section className={styles.info}>
                    <div className={styles.adress}>
                        <h1>Endereço</h1>
                        <p>Av. Milton Tavares de Souza,</p>
                        <p>s/n - Sala 115 B - Boa Viagem,</p>
                        <p>Niterói - RJ</p>
                        <p>CEP: 24210-315</p>
                    </div>
                    <div className={styles.contact}>
                        <h1>Fale Conosco</h1>
                        <p>contato@injunior.com.br</p>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="https://www.instagram.com/injunioruff/" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="instagram-icon" /></a>
                        <a href="https://www.facebook.com/injunioruff" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="instagram-icon" /></a>
                        
                        <a href="https://br.linkedin.com/company/in-junior" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="linkedin-icon" /></a>
                    </div>
                </section>
                <section className={styles.map}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1871896190382!2d-43.133260199999995!3d-22.9064655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817e444e692b%3A0xfd5e35fb577af2f5!2sUFF%20-%20Instituto%20de%20Computa%C3%A7%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1741546992552!5m2!1spt-BR!2sbr"
                        width="325"
                        height="245"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </section>
            </div>
            <div className={styles.footerBottom}>
                <p>© Copyright 2025. IN Junior. Todos os direitos reservados. Niterói, Brasil.</p>
            </div>
        </footer>

    );
}