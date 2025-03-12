import useFavoriteStore from '../../stores/FavoriteStore'
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import carrinhoNaoClicado from '../../assets/carrinho-de-compras-cinza-icon.svg'
import favoritoClicado from '../../assets/favorite-heart-icon.svg'
import styles from './styles.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Favoritos() {

    const { favorites } = useFavoriteStore()
    const navigate = useNavigate() 
    const [ carrinhoAtivo, setCarrinhoAtivo] = useState(false)

    function handleClick() {
        setCarrinhoAtivo(true)
        navigate('/carrinho')
    }

    return(
        <div>
            <div className={styles.nav}>
                <button onClick={handleClick} className={styles.carrinhoBotao}>
                    <img src={carrinhoAtivo ? carrinhoClicado : carrinhoNaoClicado} alt="" />
                    Carrinho
                </button>
                <button className={styles.favoritoBotao}>
                    <img src={favoritoClicado} alt="" />
                    Favoritos
                </button>
            </div>
            {favorites.length > 0 ? (
                favorites.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>R$ {item.price.toFixed(2)}</p>
                    </div>
                ))
            ): (
                <p>Você ainda não tem favoritos.</p>
            )}
        </div>
    )
}