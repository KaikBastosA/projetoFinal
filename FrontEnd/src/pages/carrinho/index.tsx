import CarrinhoCard from "../../components/carrinhoCard";
import useCartStore from "../../stores/CartStore";
import styles from './styles.module.css'

export default function Carrinho() {

    const { cart } = useCartStore(); 

    const calcularTotal = () => {
        return cart.reduce((total, produto) => total + produto.price * (produto.quantidade ?? 1), 0).toFixed(2) 
    }

    return (
        <>
        
        <div className={styles.box}>
            <div className={styles.cardcart}>
                {cart.length > 0 ? (
                    cart.map((produto) => (
                        <CarrinhoCard pijama={{ ...produto, quantidade: produto.quantidade ?? 1, selectedSize: produto.selectedSize ?? 'indefinido' }} key={produto.id} /> 
                    ))
                ) : (
                    <p>O carrinho está vazio.</p>
                )}
            </div>

            {cart.length > 0 && (
                <>
                    <div className={styles.total}>
                        <p>Total: R${calcularTotal()}</p>
                    </div>
                </>
            )}
        </div>
        </>
)}