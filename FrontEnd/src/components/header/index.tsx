import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logosTitulo.svg';
import cart from '../../assets/cart-icon.svg';
import heart from '../../assets/heart-icon.svg';
import user from '../../assets/user-icon.svg';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="logo-without-title" />
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/pijamas">PIJAMAS</Link></li>
                    <li><Link to="/feminino">FEMININO</Link></li>
                    <li><Link to="/masculino">MASCULINO</Link></li>
                    <li><Link to="/infantil">INFANTIL</Link></li>
                </ul>
            </nav>
            <div className={styles.icons}>
                <div className={styles.cartContainer}>
                    <Link to="/carrinho"><img src={cart} alt="cart-icon" /></Link>
                    <Link to="/favoritos"><img src={heart} alt="favorite-icon" /></Link>
                </div>
                <Link to="/login" className={styles.userContainer}>
                    <img src={user} alt="user-icon" />
                </Link>
            </div>
        </header>
    );
};