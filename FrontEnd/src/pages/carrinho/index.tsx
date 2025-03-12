import CarrinhoCard from "../../components/carrinhoCard";
import carrinhoClicado from '../../assets/carrinho-de-comprar-icon.svg'
import favoritoClicado from '../../assets/favorite-heart-icon.svg'
import favoritoNaoClicado from '../../assets/favorite-icon.svg'
import useCartStore from "../../stores/CartStore";
import styles from './styles.module.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Carrinho() {

    const { cart } = useCartStore()
    const navigate = useNavigate() 
    const [favoritoAtivo, setFavoritoAtivo] = useState(false)

    const calcularTotal = () => {
        return cart.reduce((total, produto) => total + produto.price * (produto.quantidade ?? 1), 0).toFixed(2) 
    }

    function handleClick() {
        setFavoritoAtivo(true)
        navigate('/favoritos')
    }

    return (
        <>

        <div className={styles.nav}>
            <button className={styles.carrinhoBotao}>
                <img src={carrinhoClicado} alt="" />
                Carrinho
            </button>
            <button className={styles.favoritoBotao} onClick={handleClick}>
                <img src={favoritoAtivo ? favoritoClicado : favoritoNaoClicado} alt="" />
                Favoritos
            </button>
        </div>
        
        <div className={styles.box}>
            <div className={styles.cardcart}>
                {cart.length > 0 ? (
                    cart.map((produto) => (
                        <CarrinhoCard pijama={{ ...produto, quantidade: produto.quantidade ?? 1, selectedSize: produto.selectedSize ?? 'indefinido', size: produto.size ?? [] }} key={produto.id} /> 
                    ))
                ) : (
                    <p>O carrinho está vazio.</p>
                )}
            </div>

            {cart.length > 0 && (
                <>
                    <div className={styles.comprar}>
                        <div className={styles.total}>
                            <h2>Total: </h2>
                            <p>R${calcularTotal()}</p>
                        </div>
                            <button>COMPRE TUDO</button>
                    </div>
                </>
            )}
        </div>
        </>
)}